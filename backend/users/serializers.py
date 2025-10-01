from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User


class UserSerializer(serializers.ModelSerializer):
    can_upload = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'artist_name',
            'artist_name_locked',
            'phone',
            'profile_picture',
            'usdt_wallet_address',
            'can_upload',
            'created_at'
        ]
        read_only_fields = ['id', 'artist_name_locked', 'created_at']
    
    def get_can_upload(self, obj):
        can_upload, message = obj.can_upload_track()
        return {
            'allowed': can_upload,
            'message': message
        }
    
    def update(self, instance, validated_data):
        # جلوگیری از تغییر نام هنری بعد از قفل شدن
        if instance.artist_name_locked and 'artist_name' in validated_data:
            if validated_data['artist_name'] != instance.artist_name:
                raise serializers.ValidationError({
                    'artist_name': 'نام هنری قابل تغییر نیست'
                })
        
        return super().update(instance, validated_data)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    artist_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'artist_name']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({
                'password': 'رمز عبور و تکرار آن باید یکسان باشند'
            })
        
        # Handle empty artist_name
        if 'artist_name' in data and (not data['artist_name'] or data['artist_name'].strip() == ''):
            data['artist_name'] = None
            
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                # Try with username field as well
                try:
                    user_obj = User.objects.get(email=email)
                    user = authenticate(username=user_obj.username, password=password)
                except User.DoesNotExist:
                    pass
            
            if not user:
                raise serializers.ValidationError('ایمیل یا رمز عبور اشتباه است')
            
            if not user.is_active:
                raise serializers.ValidationError('این حساب کاربری غیرفعال است')
            
            data['user'] = user
        else:
            raise serializers.ValidationError('ایمیل و رمز عبور الزامی است')
        
        return data


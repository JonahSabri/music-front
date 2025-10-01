from rest_framework import serializers
from .models import Track


class TrackSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Track
        fields = [
            'id',
            'user',
            'user_email',
            'artist_name',
            'title',
            'album_title',
            'release_type',
            'featured_artists',
            'audio_file',
            'cover_art',
            'language',
            'primary_genre',
            'secondary_genre',
            'composer',
            'lyricist',
            'arranger',
            'is_explicit',
            'is_instrumental',
            'is_cover',
            'release_date',
            'previously_released',
            'label',
            'isrc_code',
            'status',
            'status_display',
            'rejection_reason',
            'platforms',
            'shazam_enabled',
            'store_maximizer_enabled',
            'youtube_content_id_enabled',
            'created_at',
            'updated_at',
            'approved_at',
            'published_at'
        ]
        read_only_fields = [
            'id',
            'user',
            'status',
            'status_display',
            'rejection_reason',
            'created_at',
            'updated_at',
            'approved_at',
            'published_at'
        ]
    
    def validate(self, data):
        user = self.context['request'].user
        
        # بررسی امکان آپلود
        if not self.instance:  # فقط برای ایجاد جدید
            can_upload, message = user.can_upload_track()
            if not can_upload:
                raise serializers.ValidationError({
                    'non_field_errors': [message]
                })
        
        # بررسی نام هنری
        if not user.artist_name:
            if 'artist_name' not in data or not data['artist_name']:
                raise serializers.ValidationError({
                    'artist_name': 'لطفا نام هنری خود را وارد کنید'
                })
        else:
            data['artist_name'] = user.artist_name
        
        return data
    
    def create(self, validated_data):
        user = self.context['request'].user
        
        # تنظیم نام هنری کاربر و قفل کردن آن
        if not user.artist_name:
            user.artist_name = validated_data['artist_name']
            user.save()
        
        user.lock_artist_name()
        
        validated_data['user'] = user
        track = super().create(validated_data)
        return track


class TrackListSerializer(serializers.ModelSerializer):
    """Serializer ساده‌تر برای لیست ترک‌ها"""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Track
        fields = [
            'id',
            'title',
            'artist_name',
            'album_title',
            'release_type',
            'cover_art',
            'status',
            'status_display',
            'release_date',
            'created_at'
        ]


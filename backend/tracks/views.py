from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from datetime import datetime, timedelta
import json
from .models import Track
from .serializers import TrackSerializer, TrackListSerializer


@method_decorator(csrf_exempt, name='dispatch')
class TrackViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت ترک‌ها
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'release_type', 'language']
    search_fields = ['title', 'artist_name', 'album_title']
    ordering_fields = ['created_at', 'release_date', 'title']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """کاربران عادی فقط ترک‌های خودشان را می‌بینند"""
        if self.request.user.is_staff:
            return Track.objects.all()
        return Track.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        """استفاده از serializer ساده‌تر برای لیست"""
        if self.action == 'list':
            return TrackListSerializer
        return TrackSerializer
    
    def validate_track_data(self, data):
        """اعتبارسنجی داده‌های ترک"""
        errors = []
        
        # بررسی فیلدهای الزامی
        if not data.get('title'):
            errors.append('عنوان ترک الزامی است')
        
        if not data.get('artist_name'):
            errors.append('نام هنری الزامی است')
        
        if not data.get('release_date'):
            errors.append('تاریخ انتشار الزامی است')
        else:
            try:
                release_date = datetime.strptime(data['release_date'], '%Y-%m-%d').date()
                if release_date < timezone.now().date():
                    errors.append('تاریخ انتشار نمی‌تواند در گذشته باشد')
            except ValueError:
                errors.append('فرمت تاریخ انتشار نامعتبر است')
        
        if not data.get('primary_genre'):
            errors.append('ژانر اصلی الزامی است')
        
        # بررسی فایل‌ها
        if not data.get('audio_file'):
            errors.append('فایل صوتی الزامی است')
        
        if not data.get('cover_art'):
            errors.append('کاور آرت الزامی است')
        
        # بررسی پلتفرم‌ها
        platforms = data.get('platforms')
        if platforms:
            try:
                if isinstance(platforms, str):
                    platforms = json.loads(platforms)
                if not isinstance(platforms, list) or len(platforms) == 0:
                    errors.append('حداقل یک پلتفرم باید انتخاب شود')
            except json.JSONDecodeError:
                errors.append('فرمت پلتفرم‌ها نامعتبر است')
        
        return errors

    def create(self, request, *args, **kwargs):
        """ایجاد ترک جدید با اعتبارسنجی"""
        # اعتبارسنجی داده‌ها
        validation_errors = self.validate_track_data(request.data)
        if validation_errors:
            return Response({
                'error': ' • '.join(validation_errors)
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # بررسی امکان آپلود
        can_upload, message = request.user.can_upload_track()
        if not can_upload:
            return Response({
                'error': message
            }, status=status.HTTP_403_FORBIDDEN)
        
        # تنظیم نام هنری اگر خالی باشد
        if not request.data.get('artist_name') and request.user.artist_name:
            request.data['artist_name'] = request.user.artist_name
        
        # تنظیم کاربر
        request.data['user'] = request.user.id
        
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def can_upload(self, request):
        """بررسی امکان آپلود ترک جدید"""
        can_upload, message = request.user.can_upload_track()
        
        return Response({
            'can_upload': can_upload,
            'message': message,
            'artist_name': request.user.artist_name,
            'artist_name_locked': request.user.artist_name_locked
        })
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        """لیست ترک‌های در انتظار بررسی (فقط برای ادمین)"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'دسترسی غیرمجاز'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        tracks = Track.objects.filter(status='pending')
        serializer = self.get_serializer(tracks, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """تایید ترک (فقط برای ادمین)"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'دسترسی غیرمجاز'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        track = self.get_object()
        track.approve()
        
        return Response({
            'message': 'ترک با موفقیت تایید شد',
            'track': TrackSerializer(track).data
        })
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """رد ترک (فقط برای ادمین)"""
        if not request.user.is_staff:
            return Response(
                {'detail': 'دسترسی غیرمجاز'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        reason = request.data.get('reason', 'دلیلی ذکر نشده است')
        track = self.get_object()
        track.reject(reason)
        
        return Response({
            'message': 'ترک رد شد',
            'track': TrackSerializer(track).data
        })

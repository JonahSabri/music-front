from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Avg, Count
from django.utils import timezone
from datetime import timedelta
from .models import TrackAnalytics, DailyStreams, UserAnalytics, AnalyticsReport
from .serializers import (
    TrackAnalyticsSerializer, 
    DailyStreamsSerializer, 
    UserAnalyticsSerializer, 
    AnalyticsReportSerializer,
    AnalyticsSummarySerializer
)
from tracks.models import Track


class TrackAnalyticsViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت آمار ترک‌ها
    """
    serializer_class = TrackAnalyticsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """کاربران عادی فقط آمار ترک‌های خودشان را می‌بینند"""
        if self.request.user.is_staff:
            return TrackAnalytics.objects.all()
        return TrackAnalytics.objects.filter(track__user=self.request.user)
    
    def perform_create(self, serializer):
        """تنظیم ترک بر اساس کاربر"""
        track_id = self.request.data.get('track')
        if track_id:
            track = Track.objects.get(id=track_id)
            if track.user != self.request.user and not self.request.user.is_staff:
                raise PermissionError("شما فقط می‌توانید آمار ترک‌های خودتان را مدیریت کنید")
        serializer.save()


class DailyStreamsViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت آمار پخش روزانه
    """
    serializer_class = DailyStreamsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """کاربران عادی فقط آمار ترک‌های خودشان را می‌بینند"""
        if self.request.user.is_staff:
            return DailyStreams.objects.all()
        return DailyStreams.objects.filter(track__user=self.request.user)


class UserAnalyticsViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت آمار کاربران
    """
    serializer_class = UserAnalyticsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """کاربران عادی فقط آمار خودشان را می‌بینند"""
        if self.request.user.is_staff:
            return UserAnalytics.objects.all()
        return UserAnalytics.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """تنظیم کاربر"""
        serializer.save(user=self.request.user)


class AnalyticsReportViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای مدیریت گزارش‌های تحلیلی
    """
    serializer_class = AnalyticsReportSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """کاربران عادی فقط گزارش‌های خودشان را می‌بینند"""
        if self.request.user.is_staff:
            return AnalyticsReport.objects.all()
        return AnalyticsReport.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """تنظیم کاربر"""
        serializer.save(user=self.request.user)


class AnalyticsSummaryView(generics.RetrieveAPIView):
    """
    خلاصه آمار کاربر
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        user = request.user
        
        # دریافت آمار کلی کاربر
        try:
            user_analytics = UserAnalytics.objects.get(user=user)
        except UserAnalytics.DoesNotExist:
            # اگر آمار کاربر وجود نداشت، ایجاد کن
            user_analytics = UserAnalytics.objects.create(user=user)
        
        # محاسبه آمار پلتفرم‌ها
        platform_distribution = {
            'spotify': user_analytics.spotify_total_streams,
            'apple_music': user_analytics.apple_music_total_streams,
            'youtube_music': user_analytics.youtube_music_total_streams,
            'amazon_music': user_analytics.amazon_music_total_streams,
            'other_platforms': user_analytics.other_platforms_total_streams,
        }
        
        # محاسبه آمار جغرافیایی
        geographic_distribution = {
            'iran': user_analytics.iran_total_listeners,
            'usa': user_analytics.usa_total_listeners,
            'germany': user_analytics.germany_total_listeners,
            'uk': user_analytics.uk_total_listeners,
            'canada': user_analytics.canada_total_listeners,
            'australia': user_analytics.australia_total_listeners,
            'france': user_analytics.france_total_listeners,
            'other_countries': user_analytics.other_countries_total_listeners,
        }
        
        # آمار پخش روزانه (آخرین 30 روز)
        thirty_days_ago = timezone.now().date() - timedelta(days=30)
        daily_streams = []
        for i in range(30):
            date = thirty_days_ago + timedelta(days=i)
            total_streams = DailyStreams.objects.filter(
                track__user=user,
                date=date
            ).aggregate(total=Sum('streams'))['total'] or 0
            daily_streams.append({
                'date': date.isoformat(),
                'streams': total_streams
            })
        
        # ترک‌های برتر
        top_tracks = TrackAnalytics.objects.filter(
            track__user=user
        ).order_by('-total_streams')[:5].values(
            'track__title',
            'track__artist_name',
            'total_streams',
            'unique_listeners'
        )
        
        # میانگین زمان پخش
        avg_duration = TrackAnalytics.objects.filter(
            track__user=user
        ).aggregate(avg=Avg('average_listen_duration'))['avg']
        
        summary_data = {
            'total_streams': user_analytics.total_streams,
            'total_unique_listeners': user_analytics.total_unique_listeners,
            'total_playlist_saves': user_analytics.total_playlist_saves,
            'average_listen_duration': avg_duration,
            'platform_distribution': platform_distribution,
            'geographic_distribution': geographic_distribution,
            'daily_streams': daily_streams,
            'top_tracks': list(top_tracks)
        }
        
        serializer = AnalyticsSummarySerializer(summary_data)
        return Response(serializer.data)


class TrackAnalyticsDetailView(generics.RetrieveAPIView):
    """
    جزئیات آمار یک ترک خاص
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, track_id, *args, **kwargs):
        try:
            track = Track.objects.get(id=track_id, user=request.user)
        except Track.DoesNotExist:
            return Response(
                {'error': 'ترک یافت نشد'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            analytics = TrackAnalytics.objects.get(track=track)
        except TrackAnalytics.DoesNotExist:
            return Response(
                {'error': 'آمار این ترک موجود نیست'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # آمار پخش روزانه این ترک
        thirty_days_ago = timezone.now().date() - timedelta(days=30)
        daily_streams = DailyStreams.objects.filter(
            track=track,
            date__gte=thirty_days_ago
        ).order_by('date')
        
        serializer = TrackAnalyticsSerializer(analytics)
        daily_serializer = DailyStreamsSerializer(daily_streams, many=True)
        
        return Response({
            'analytics': serializer.data,
            'daily_streams': daily_serializer.data
        })

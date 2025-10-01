from rest_framework import serializers
from .models import TrackAnalytics, DailyStreams, UserAnalytics, AnalyticsReport
from tracks.models import Track


class TrackAnalyticsSerializer(serializers.ModelSerializer):
    track_title = serializers.CharField(source='track.title', read_only=True)
    track_artist = serializers.CharField(source='track.artist_name', read_only=True)
    
    class Meta:
        model = TrackAnalytics
        fields = [
            'id',
            'track',
            'track_title',
            'track_artist',
            'total_streams',
            'unique_listeners',
            'playlist_saves',
            'average_listen_duration',
            'spotify_streams',
            'apple_music_streams',
            'youtube_music_streams',
            'amazon_music_streams',
            'other_platforms_streams',
            'iran_listeners',
            'usa_listeners',
            'germany_listeners',
            'uk_listeners',
            'canada_listeners',
            'australia_listeners',
            'france_listeners',
            'other_countries_listeners',
            'last_updated',
            'created_at'
        ]
        read_only_fields = ['last_updated', 'created_at']


class DailyStreamsSerializer(serializers.ModelSerializer):
    track_title = serializers.CharField(source='track.title', read_only=True)
    
    class Meta:
        model = DailyStreams
        fields = [
            'id',
            'track',
            'track_title',
            'date',
            'streams'
        ]


class UserAnalyticsSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    artist_name = serializers.CharField(source='user.artist_name', read_only=True)
    
    class Meta:
        model = UserAnalytics
        fields = [
            'id',
            'user',
            'user_email',
            'artist_name',
            'total_streams',
            'total_unique_listeners',
            'total_playlist_saves',
            'spotify_total_streams',
            'apple_music_total_streams',
            'youtube_music_total_streams',
            'amazon_music_total_streams',
            'other_platforms_total_streams',
            'iran_total_listeners',
            'usa_total_listeners',
            'germany_total_listeners',
            'uk_total_listeners',
            'canada_total_listeners',
            'australia_total_listeners',
            'france_total_listeners',
            'other_countries_total_listeners',
            'last_updated',
            'created_at'
        ]
        read_only_fields = ['last_updated', 'created_at']


class AnalyticsReportSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    artist_name = serializers.CharField(source='user.artist_name', read_only=True)
    
    class Meta:
        model = AnalyticsReport
        fields = [
            'id',
            'user',
            'user_email',
            'artist_name',
            'report_type',
            'period_start',
            'period_end',
            'total_streams',
            'total_unique_listeners',
            'total_playlist_saves',
            'detailed_data',
            'created_at'
        ]
        read_only_fields = ['created_at']


class AnalyticsSummarySerializer(serializers.Serializer):
    """
    خلاصه آمار کاربر
    """
    total_streams = serializers.IntegerField()
    total_unique_listeners = serializers.IntegerField()
    total_playlist_saves = serializers.IntegerField()
    average_listen_duration = serializers.DurationField(allow_null=True)
    
    # آمار پلتفرم‌ها
    platform_distribution = serializers.DictField()
    
    # آمار جغرافیایی
    geographic_distribution = serializers.DictField()
    
    # آمار زمانی (آخرین 30 روز)
    daily_streams = serializers.ListField()
    
    # ترک‌های برتر
    top_tracks = serializers.ListField()

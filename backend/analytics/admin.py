from django.contrib import admin
from django.utils.html import format_html
from .models import TrackAnalytics, DailyStreams, UserAnalytics, AnalyticsReport


@admin.register(TrackAnalytics)
class TrackAnalyticsAdmin(admin.ModelAdmin):
    list_display = [
        'track_title',
        'user_email',
        'total_streams',
        'unique_listeners',
        'playlist_saves',
        'last_updated'
    ]
    list_filter = ['last_updated', 'created_at']
    search_fields = ['track__title', 'track__user__email', 'track__user__artist_name']
    readonly_fields = ['last_updated', 'created_at']
    
    fieldsets = (
        ('اطلاعات ترک', {
            'fields': ('track',)
        }),
        ('آمار کلی', {
            'fields': (
                'total_streams',
                'unique_listeners',
                'playlist_saves',
                'average_listen_duration'
            )
        }),
        ('آمار پلتفرم‌ها', {
            'fields': (
                'spotify_streams',
                'apple_music_streams',
                'youtube_music_streams',
                'amazon_music_streams',
                'other_platforms_streams'
            )
        }),
        ('آمار جغرافیایی', {
            'fields': (
                'iran_listeners',
                'usa_listeners',
                'germany_listeners',
                'uk_listeners',
                'canada_listeners',
                'australia_listeners',
                'france_listeners',
                'other_countries_listeners'
            )
        }),
        ('اطلاعات سیستم', {
            'fields': ('last_updated', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def track_title(self, obj):
        return obj.track.title
    track_title.short_description = 'عنوان ترک'
    
    def user_email(self, obj):
        return obj.track.user.email
    user_email.short_description = 'ایمیل کاربر'


@admin.register(DailyStreams)
class DailyStreamsAdmin(admin.ModelAdmin):
    list_display = [
        'track_title',
        'user_email',
        'date',
        'streams'
    ]
    list_filter = ['date', 'track__user']
    search_fields = ['track__title', 'track__user__email', 'track__user__artist_name']
    date_hierarchy = 'date'
    
    def track_title(self, obj):
        return obj.track.title
    track_title.short_description = 'عنوان ترک'
    
    def user_email(self, obj):
        return obj.track.user.email
    user_email.short_description = 'ایمیل کاربر'


@admin.register(UserAnalytics)
class UserAnalyticsAdmin(admin.ModelAdmin):
    list_display = [
        'user_email',
        'artist_name',
        'total_streams',
        'total_unique_listeners',
        'total_playlist_saves',
        'last_updated'
    ]
    list_filter = ['last_updated', 'created_at']
    search_fields = ['user__email', 'user__artist_name', 'user__username']
    readonly_fields = ['last_updated', 'created_at']
    
    fieldsets = (
        ('اطلاعات کاربر', {
            'fields': ('user',)
        }),
        ('آمار کلی', {
            'fields': (
                'total_streams',
                'total_unique_listeners',
                'total_playlist_saves'
            )
        }),
        ('آمار پلتفرم‌ها', {
            'fields': (
                'spotify_total_streams',
                'apple_music_total_streams',
                'youtube_music_total_streams',
                'amazon_music_total_streams',
                'other_platforms_total_streams'
            )
        }),
        ('آمار جغرافیایی', {
            'fields': (
                'iran_total_listeners',
                'usa_total_listeners',
                'germany_total_listeners',
                'uk_total_listeners',
                'canada_total_listeners',
                'australia_total_listeners',
                'france_total_listeners',
                'other_countries_total_listeners'
            )
        }),
        ('اطلاعات سیستم', {
            'fields': ('last_updated', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'ایمیل کاربر'
    
    def artist_name(self, obj):
        return obj.user.artist_name or obj.user.username
    artist_name.short_description = 'نام هنری'


@admin.register(AnalyticsReport)
class AnalyticsReportAdmin(admin.ModelAdmin):
    list_display = [
        'user_email',
        'artist_name',
        'report_type',
        'period_start',
        'period_end',
        'total_streams',
        'created_at'
    ]
    list_filter = ['report_type', 'created_at', 'period_start']
    search_fields = ['user__email', 'user__artist_name', 'user__username']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('اطلاعات گزارش', {
            'fields': (
                'user',
                'report_type',
                'period_start',
                'period_end'
            )
        }),
        ('خلاصه گزارش', {
            'fields': (
                'total_streams',
                'total_unique_listeners',
                'total_playlist_saves'
            )
        }),
        ('جزئیات گزارش', {
            'fields': ('detailed_data',),
            'classes': ('collapse',)
        }),
        ('اطلاعات سیستم', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'ایمیل کاربر'
    
    def artist_name(self, obj):
        return obj.user.artist_name or obj.user.username
    artist_name.short_description = 'نام هنری'

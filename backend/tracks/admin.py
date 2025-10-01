from django.contrib import admin
from django.utils.html import format_html
from .models import Track


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'artist_name',
        'user_email',
        'release_type',
        'status_badge',
        'release_date',
        'created_at'
    ]
    list_filter = ['status', 'release_type', 'language', 'is_explicit', 'created_at']
    search_fields = ['title', 'artist_name', 'user__email', 'album_title']
    readonly_fields = [
        'created_at',
        'updated_at',
        'approved_at',
        'published_at',
        'audio_preview',
        'cover_preview'
    ]
    
    fieldsets = (
        ('اطلاعات کاربر', {
            'fields': ('user', 'artist_name')
        }),
        ('اطلاعات انتشار', {
            'fields': (
                'title',
                'album_title',
                'release_type',
                'featured_artists',
                'release_date',
                'previously_released',
                'label'
            )
        }),
        ('فایل‌ها', {
            'fields': (
                'audio_file',
                'audio_preview',
                'cover_art',
                'cover_preview'
            )
        }),
        ('متادیتا', {
            'fields': (
                'language',
                'primary_genre',
                'secondary_genre',
                'composer',
                'lyricist',
                'arranger'
            )
        }),
        ('تنظیمات', {
            'fields': (
                'is_explicit',
                'is_instrumental',
                'is_cover',
                'isrc_code'
            )
        }),
        ('پلتفرم‌ها و سرویس‌ها', {
            'fields': (
                'platforms',
                'shazam_enabled',
                'store_maximizer_enabled',
                'youtube_content_id_enabled'
            )
        }),
        ('وضعیت و مدیریت', {
            'fields': (
                'status',
                'admin_notes',
                'rejection_reason',
                'approved_at',
                'published_at'
            )
        }),
    )
    
    actions = ['approve_tracks', 'reject_tracks', 'publish_tracks']
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'ایمیل کاربر'
    
    def status_badge(self, obj):
        colors = {
            'pending': '#FFA500',
            'approved': '#4CAF50',
            'rejected': '#F44336',
            'published': '#2196F3',
        }
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px;">{}</span>',
            colors.get(obj.status, '#999'),
            obj.get_status_display()
        )
    status_badge.short_description = 'وضعیت'
    
    def audio_preview(self, obj):
        if obj.audio_file:
            return format_html(
                '<audio controls><source src="{}" type="audio/mpeg"></audio>',
                obj.audio_file.url
            )
        return '-'
    audio_preview.short_description = 'پیش‌نمایش صوتی'
    
    def cover_preview(self, obj):
        if obj.cover_art:
            return format_html(
                '<img src="{}" width="200" height="200" />',
                obj.cover_art.url
            )
        return '-'
    cover_preview.short_description = 'پیش‌نمایش کاور'
    
    def approve_tracks(self, request, queryset):
        for track in queryset:
            track.approve()
        self.message_user(request, f'{queryset.count()} ترک تایید شد.')
    approve_tracks.short_description = 'تایید ترک‌های انتخاب شده'
    
    def reject_tracks(self, request, queryset):
        for track in queryset:
            track.reject('رد شده توسط مدیر')
        self.message_user(request, f'{queryset.count()} ترک رد شد.')
    reject_tracks.short_description = 'رد ترک‌های انتخاب شده'
    
    def publish_tracks(self, request, queryset):
        for track in queryset.filter(status='approved'):
            track.publish()
        self.message_user(request, f'ترک‌های تایید شده منتشر شدند.')
    publish_tracks.short_description = 'انتشار ترک‌های تایید شده'

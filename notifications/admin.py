from django.contrib import admin
from django.utils.html import format_html
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = [
        'user_email', 'title', 'notification_type_badge', 'is_read_badge',
        'created_at', 'track_title', 'payment_amount'
    ]
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['user__email', 'user__artist_name', 'title', 'message']
    readonly_fields = ['created_at', 'read_at']
    fieldsets = (
        ('اطلاعات اعلان', {
            'fields': ('user', 'title', 'message', 'notification_type')
        }),
        ('وضعیت', {
            'fields': ('is_read', 'read_at')
        }),
        ('مرتبط', {
            'fields': ('track', 'payment'),
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
    
    def notification_type_badge(self, obj):
        colors = {
            'info': '#2196F3',
            'success': '#4CAF50',
            'warning': '#FF9800',
            'error': '#F44336',
            'payment': '#9C27B0',
            'track': '#607D8B',
            'subscription': '#795548',
        }
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px;">{}</span>',
            colors.get(obj.notification_type, '#999'),
            obj.get_notification_type_display()
        )
    notification_type_badge.short_description = 'نوع'
    
    def is_read_badge(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 3px;">خوانده شده</span>'
            )
        else:
            return format_html(
                '<span style="background-color: #FF9800; color: white; padding: 3px 10px; border-radius: 3px;">خوانده نشده</span>'
            )
    is_read_badge.short_description = 'وضعیت'
    
    def track_title(self, obj):
        return obj.track.title if obj.track else '-'
    track_title.short_description = 'ترک مرتبط'
    
    def payment_amount(self, obj):
        if obj.payment:
            return f"{obj.payment.amount:,} تومان"
        return '-'
    payment_amount.short_description = 'مبلغ پرداخت'
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        """علامت‌گذاری اعلان‌های انتخاب شده به عنوان خوانده شده"""
        from django.utils import timezone
        count = queryset.update(is_read=True, read_at=timezone.now())
        self.message_user(
            request,
            f'{count} اعلان خوانده شد.'
        )
    mark_as_read.short_description = "علامت‌گذاری به عنوان خوانده شده"
    
    def mark_as_unread(self, request, queryset):
        """علامت‌گذاری اعلان‌های انتخاب شده به عنوان خوانده نشده"""
        count = queryset.update(is_read=False, read_at=None)
        self.message_user(
            request,
            f'{count} اعلان خوانده نشده شد.'
        )
    mark_as_unread.short_description = "علامت‌گذاری به عنوان خوانده نشده"
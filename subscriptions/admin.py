from django.contrib import admin
from .models import SubscriptionPlan, Subscription


@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = [
        'name_fa',
        'name',
        'price_irr',
        'duration_days',
        'max_tracks_display',
        'is_active'
    ]
    list_filter = ['is_active']
    search_fields = ['name', 'name_fa']
    
    fieldsets = (
        ('اطلاعات پایه', {
            'fields': ('name', 'name_fa', 'price_irr', 'duration_days', 'is_active')
        }),
        ('ویژگی‌ها', {
            'fields': (
                'max_tracks',
                'has_pre_save',
                'has_content_id',
                'has_splits',
                'has_analytics',
                'has_shazam',
                'has_store_maximizer',
                'has_priority_support'
            )
        }),
    )
    
    def max_tracks_display(self, obj):
        return 'نامحدود' if obj.max_tracks is None else obj.max_tracks
    max_tracks_display.short_description = 'تعداد ترک'


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = [
        'user_email',
        'plan',
        'start_date',
        'end_date',
        'is_active',
        'is_valid_display'
    ]
    list_filter = ['is_active', 'plan', 'start_date']
    search_fields = ['user__email', 'user__artist_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('اطلاعات اشتراک', {
            'fields': ('user', 'plan', 'start_date', 'end_date', 'is_active')
        }),
        ('پرداخت', {
            'fields': ('payment',)
        }),
    )
    
    actions = ['activate_subscriptions']
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'ایمیل کاربر'
    
    def is_valid_display(self, obj):
        return '✓' if obj.is_valid() else '✗'
    is_valid_display.short_description = 'معتبر'
    is_valid_display.boolean = True
    
    def activate_subscriptions(self, request, queryset):
        for subscription in queryset:
            subscription.activate()
        self.message_user(request, f'{queryset.count()} اشتراک فعال شد.')
    activate_subscriptions.short_description = 'فعال‌سازی اشتراک‌های انتخاب شده'

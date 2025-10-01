from django.contrib import admin
from django.utils.html import format_html
from .models import PaymentMethod, Payment, Card


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = [
        'bank', 'get_masked_card_number', 'card_holder_name', 
        'is_active', 'created_at'
    ]
    list_filter = ['bank', 'is_active', 'created_at']
    search_fields = ['card_number', 'card_holder_name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('اطلاعات کارت', {
            'fields': ('bank', 'card_number', 'card_holder_name')
        }),
        ('تنظیمات', {
            'fields': ('is_active', 'description')
        }),
        ('اطلاعات سیستم', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_masked_card_number(self, obj):
        """نمایش شماره کارت به صورت مخفی"""
        return obj.get_masked_card_number()
    get_masked_card_number.short_description = "شماره کارت"
    
    actions = ['activate_cards', 'deactivate_cards']
    
    def activate_cards(self, request, queryset):
        """فعال کردن کارت‌های انتخاب شده"""
        count = queryset.update(is_active=True)
        self.message_user(
            request,
            f'{count} کارت فعال شد.'
        )
    activate_cards.short_description = "فعال کردن کارت‌های انتخاب شده"
    
    def deactivate_cards(self, request, queryset):
        """غیرفعال کردن کارت‌های انتخاب شده"""
        count = queryset.update(is_active=False)
        self.message_user(
            request,
            f'{count} کارت غیرفعال شد.'
        )
    deactivate_cards.short_description = "غیرفعال کردن کارت‌های انتخاب شده"


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name']
    ordering = ['-created_at']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        'user_email',
        'amount_display',
        'subscription_plan',
        'status_badge',
        'transfer_info',
        'created_at'
    ]
    list_filter = ['status', 'subscription_plan', 'created_at']
    search_fields = [
        'user__email',
        'user__artist_name',
        'tracking_id',
        'last_four_digits'
    ]
    readonly_fields = [
        'created_at',
        'updated_at',
        'receipt_preview'
    ]
    
    fieldsets = (
        ('اطلاعات کاربر', {
            'fields': ('user', 'subscription_plan', 'amount')
        }),
        ('اطلاعات واریز', {
            'fields': (
                'transfer_date',
                'transfer_time',
                'tracking_id',
                'last_four_digits',
                'receipt_file',
                'receipt_preview'
            )
        }),
        ('وضعیت', {
            'fields': (
                'status',
                'admin_notes'
            )
        }),
    )
    
    actions = ['approve_payments', 'reject_payments']
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'ایمیل کاربر'
    
    def amount_display(self, obj):
        return f"{obj.amount:,} تومان"
    amount_display.short_description = 'مبلغ'
    
    def status_badge(self, obj):
        colors = {
            'pending': '#FFA500',
            'approved': '#4CAF50',
            'rejected': '#F44336',
        }
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px;">{}</span>',
            colors.get(obj.status, '#999'),
            obj.get_status_display()
        )
    status_badge.short_description = 'وضعیت'
    
    def transfer_info(self, obj):
        return f"{obj.transfer_date} {obj.transfer_time}"
    transfer_info.short_description = 'تاریخ و ساعت واریز'
    
    def receipt_preview(self, obj):
        if obj.receipt_file:
            return format_html(
                '<a href="{}" target="_blank">مشاهده رسید</a>',
                obj.receipt_file.url
            )
        return '-'
    receipt_preview.short_description = 'پیش‌نمایش رسید'
    
    def approve_payments(self, request, queryset):
        count = 0
        for payment in queryset.filter(status='pending'):
            payment.approve()
            count += 1
        self.message_user(
            request,
            f'{count} پرداخت تایید و اشتراک فعال شد.'
        )
    approve_payments.short_description = 'تایید پرداخت‌ها و فعال‌سازی اشتراک'
    
    def reject_payments(self, request, queryset):
        count = 0
        for payment in queryset.filter(status='pending'):
            payment.reject('رد شده توسط مدیر')
            count += 1
        self.message_user(request, f'{count} پرداخت رد شد.')
    reject_payments.short_description = 'رد پرداخت‌های انتخاب شده'

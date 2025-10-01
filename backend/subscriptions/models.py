from django.db import models
from django.conf import settings
from datetime import timedelta
from django.utils import timezone


class SubscriptionPlan(models.Model):
    """
    طرح‌های اشتراک
    """
    name = models.CharField(max_length=100, verbose_name="نام طرح")
    name_fa = models.CharField(max_length=100, verbose_name="نام فارسی")
    price_irr = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        verbose_name="قیمت (تومان)"
    )
    duration_days = models.IntegerField(
        default=365,
        verbose_name="مدت (روز)"
    )
    
    # Features
    max_tracks = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="حداکثر تعداد ترک (null = نامحدود)"
    )
    has_pre_save = models.BooleanField(default=False)
    has_content_id = models.BooleanField(default=False)
    has_splits = models.BooleanField(default=False)
    has_analytics = models.BooleanField(default=True)
    has_shazam = models.BooleanField(default=False)
    has_store_maximizer = models.BooleanField(default=False)
    has_priority_support = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['price_irr']
        verbose_name = "طرح اشتراک"
        verbose_name_plural = "طرح‌های اشتراک"
    
    def __str__(self):
        return f"{self.name_fa} - {self.price_irr:,} تومان"


class Subscription(models.Model):
    """
    اشتراک کاربران
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='subscriptions'
    )
    plan = models.ForeignKey(
        SubscriptionPlan,
        on_delete=models.PROTECT,
        related_name='subscriptions'
    )
    
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=False)
    
    # Linked to payment
    payment = models.OneToOneField(
        'payments.Payment',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='subscription'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "اشتراک"
        verbose_name_plural = "اشتراک‌ها"
    
    def __str__(self):
        return f"{self.user.email} - {self.plan.name_fa}"
    
    def activate(self):
        """فعال‌سازی اشتراک"""
        self.is_active = True
        self.start_date = timezone.now()
        self.end_date = self.start_date + timedelta(days=self.plan.duration_days)
        self.save()
    
    def is_valid(self):
        """بررسی اعتبار اشتراک"""
        return self.is_active and self.end_date >= timezone.now()

from django.db import models
from django.conf import settings


class PaymentMethod(models.Model):
    """
    روش‌های پرداخت
    """
    name = models.CharField(max_length=100, verbose_name="نام روش پرداخت")
    is_active = models.BooleanField(default=True, verbose_name="فعال")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "روش پرداخت"
        verbose_name_plural = "روش‌های پرداخت"
    
    def __str__(self):
        return self.name


class Card(models.Model):
    """
    کارت‌های بانکی برای پرداخت
    """
    BANK_CHOICES = [
        ('melli', 'ملی'),
        ('mellat', 'ملت'),
        ('saderat', 'صادرات'),
        ('tejarat', 'تجارت'),
        ('parsian', 'پارسیان'),
        ('saman', 'سامان'),
        ('pasargad', 'پاسارگاد'),
        ('sina', 'سینا'),
        ('postbank', 'پست بانک'),
        ('other', 'سایر'),
    ]
    
    bank = models.CharField(
        max_length=20,
        choices=BANK_CHOICES,
        verbose_name="بانک"
    )
    card_number = models.CharField(
        max_length=19,
        verbose_name="شماره کارت",
        help_text="شماره 16 رقمی کارت"
    )
    card_holder_name = models.CharField(
        max_length=100,
        verbose_name="نام صاحب کارت"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="فعال"
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="توضیحات",
        help_text="توضیحات اضافی برای این کارت"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "کارت بانکی"
        verbose_name_plural = "کارت‌های بانکی"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_bank_display()} - {self.card_number[:4]}****{self.card_number[-4:]}"
    
    def get_masked_card_number(self):
        """نمایش شماره کارت به صورت مخفی"""
        if len(self.card_number) >= 8:
            return f"{self.card_number[:4]}****{self.card_number[-4:]}"
        return "****"


class Payment(models.Model):
    """
    پرداخت‌های کاربران
    """
    STATUS_CHOICES = [
        ('pending', 'در انتظار'),
        ('approved', 'تایید شده'),
        ('rejected', 'رد شده'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='payments',
        verbose_name="کاربر"
    )
    subscription_plan = models.ForeignKey(
        'subscriptions.SubscriptionPlan',
        on_delete=models.PROTECT,
        related_name='payments',
        verbose_name="طرح اشتراک"
    )
    
    # اطلاعات پرداخت
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        verbose_name="مبلغ (تومان)"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name="وضعیت"
    )
    
    # اطلاعات انتقال
    transfer_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="تاریخ انتقال"
    )
    transfer_time = models.TimeField(
        null=True,
        blank=True,
        verbose_name="ساعت انتقال"
    )
    tracking_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="شناسه پیگیری"
    )
    last_four_digits = models.CharField(
        max_length=4,
        blank=True,
        null=True,
        verbose_name="چهار رقم آخر کارت مبدا"
    )
    
    # فایل رسید
    receipt_file = models.FileField(
        upload_to='receipts/',
        null=True,
        blank=True,
        verbose_name="فایل رسید"
    )
    
    # توضیحات
    user_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="توضیحات کاربر"
    )
    admin_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="توضیحات ادمین"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "پرداخت"
        verbose_name_plural = "پرداخت‌ها"
    
    def __str__(self):
        return f"{self.user.email} - {self.subscription_plan.name_fa} - {self.amount:,} تومان"
    
    def approve(self):
        """تایید پرداخت"""
        self.status = 'approved'
        self.save()
    
    def reject(self, reason=None):
        """رد پرداخت"""
        self.status = 'rejected'
        if reason:
            self.admin_notes = reason
        self.save()
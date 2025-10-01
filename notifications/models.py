from django.db import models
from django.conf import settings
from django.utils import timezone


class Notification(models.Model):
    """
    اعلان‌های کاربران
    """
    TYPE_CHOICES = [
        ('info', 'اطلاعاتی'),
        ('success', 'موفقیت'),
        ('warning', 'هشدار'),
        ('error', 'خطا'),
        ('payment', 'پرداخت'),
        ('track', 'ترک'),
        ('subscription', 'اشتراک'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        verbose_name="کاربر"
    )
    title = models.CharField(max_length=200, verbose_name="عنوان")
    message = models.TextField(verbose_name="پیام")
    notification_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default='info',
        verbose_name="نوع اعلان"
    )
    is_read = models.BooleanField(default=False, verbose_name="خوانده شده")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    read_at = models.DateTimeField(null=True, blank=True, verbose_name="تاریخ خواندن")
    
    # Optional fields for linking to specific objects
    track = models.ForeignKey(
        'tracks.Track',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='notifications',
        verbose_name="ترک مرتبط"
    )
    payment = models.ForeignKey(
        'payments.Payment',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='notifications',
        verbose_name="پرداخت مرتبط"
    )
    
    class Meta:
        verbose_name = "اعلان"
        verbose_name_plural = "اعلان‌ها"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.title}"
    
    def mark_as_read(self):
        """علامت‌گذاری اعلان به عنوان خوانده شده"""
        if not self.is_read:
            self.is_read = True
            self.read_at = timezone.now()
            self.save()
    
    @classmethod
    def create_notification(cls, user, title, message, notification_type='info', track=None, payment=None):
        """ایجاد اعلان جدید"""
        return cls.objects.create(
            user=user,
            title=title,
            message=message,
            notification_type=notification_type,
            track=track,
            payment=payment
        )
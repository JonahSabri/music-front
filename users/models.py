from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom User model with artist information
    """
    email = models.EmailField(unique=True)
    artist_name = models.CharField(
        max_length=255, 
        blank=True,
        null=True,
        help_text="نام هنری کاربر - پس از تنظیم قابل تغییر نیست"
    )
    artist_name_locked = models.BooleanField(
        default=False,
        help_text="نشان می‌دهد که آیا نام هنری قفل شده است"
    )
    phone = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )
    
    # Payment Info
    usdt_wallet_address = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="آدرس ولت USDT (TRC20) برای دریافت پرداخت"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.email
    
    def can_upload_track(self):
        """
        بررسی می‌کند که آیا کاربر می‌تواند ترک آپلود کند
        کاربران بدون اشتراک فقط می‌توانند یک ترک آپلود کنند
        """
        from subscriptions.models import Subscription
        from django.utils import timezone
        
        # بررسی اشتراک فعال
        active_subscription = Subscription.objects.filter(
            user=self,
            is_active=True,
            end_date__gte=timezone.now().date()
        ).exists()
        
        if active_subscription:
            return True, "اشتراک فعال دارید"
        
        # بررسی تعداد ترک‌های آپلود شده برای کاربران بدون اشتراک
        from tracks.models import Track
        track_count = Track.objects.filter(user=self).count()
        
        if track_count >= 1:
            return False, "کاربران بدون اشتراک فقط می‌توانند یک ترک رایگان آپلود کنند"
        
        return True, "شما می‌توانید یک ترک رایگان آپلود کنید"
    
    def lock_artist_name(self):
        """
        قفل کردن نام هنری پس از اولین آپلود
        """
        if not self.artist_name_locked:
            self.artist_name_locked = True
            self.save()

from django.db import models
from django.conf import settings


class Track(models.Model):
    """
    مدل ترک موسیقی
    """
    STATUS_CHOICES = [
        ('pending', 'در انتظار بررسی'),
        ('approved', 'تایید شده'),
        ('rejected', 'رد شده'),
        ('published', 'منتشر شده'),
    ]
    
    RELEASE_TYPE_CHOICES = [
        ('single', 'تک‌آهنگ'),
        ('album', 'آلبوم'),
        ('ep', 'EP'),
    ]
    
    LANGUAGE_CHOICES = [
        ('persian', 'فارسی'),
        ('english', 'انگلیسی'),
        ('arabic', 'عربی'),
        ('turkish', 'ترکی'),
        ('instrumental', 'بی‌کلام'),
    ]
    
    # User & Basic Info
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tracks'
    )
    artist_name = models.CharField(
        max_length=255,
        help_text="نام هنرمند در زمان آپلود"
    )
    
    # Release Information
    title = models.CharField(max_length=255, verbose_name="عنوان")
    album_title = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="عنوان آلبوم"
    )
    release_type = models.CharField(
        max_length=20,
        choices=RELEASE_TYPE_CHOICES,
        default='single'
    )
    featured_artists = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        help_text="هنرمندان همکار (Feat)"
    )
    
    # Files
    audio_file = models.FileField(
        upload_to='tracks/audio/%Y/%m/',
        help_text="فایل صوتی (WAV/FLAC)"
    )
    cover_art = models.ImageField(
        upload_to='tracks/covers/%Y/%m/',
        help_text="کاور آرت (حداقل 3000x3000)"
    )
    
    # Metadata
    language = models.CharField(
        max_length=20,
        choices=LANGUAGE_CHOICES,
        default='persian'
    )
    primary_genre = models.CharField(max_length=100, verbose_name="ژانر اصلی")
    secondary_genre = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="ژانر فرعی"
    )
    
    composer = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="آهنگساز"
    )
    lyricist = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="شاعر"
    )
    arranger = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="تنظیم‌کننده"
    )
    
    # Options
    is_explicit = models.BooleanField(default=False, verbose_name="محتوای صریح")
    is_instrumental = models.BooleanField(default=False, verbose_name="بی‌کلام")
    is_cover = models.BooleanField(default=False, verbose_name="بازخوانی")
    
    # Release Details
    release_date = models.DateField(verbose_name="تاریخ انتشار")
    previously_released = models.BooleanField(
        default=False,
        verbose_name="قبلاً منتشر شده"
    )
    label = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="لیبل موسیقی"
    )
    
    # ISRC Code
    isrc_code = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        unique=True,
        verbose_name="کد ISRC"
    )
    
    # Status & Admin
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    admin_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="یادداشت‌های مدیر"
    )
    rejection_reason = models.TextField(
        blank=True,
        null=True,
        verbose_name="دلیل رد"
    )
    
    # Platforms
    platforms = models.JSONField(
        default=list,
        help_text="لیست پلتفرم‌های انتخاب شده"
    )
    
    # Additional Services
    shazam_enabled = models.BooleanField(default=False)
    store_maximizer_enabled = models.BooleanField(default=False)
    youtube_content_id_enabled = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved_at = models.DateTimeField(blank=True, null=True)
    published_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "ترک"
        verbose_name_plural = "ترک‌ها"
    
    def __str__(self):
        return f"{self.title} - {self.artist_name}"
    
    def approve(self):
        """تایید ترک توسط مدیر"""
        from django.utils import timezone
        self.status = 'approved'
        self.approved_at = timezone.now()
        self.save()
    
    def reject(self, reason):
        """رد ترک توسط مدیر"""
        self.status = 'rejected'
        self.rejection_reason = reason
        self.save()
    
    def publish(self):
        """انتشار ترک"""
        from django.utils import timezone
        self.status = 'published'
        self.published_at = timezone.now()
        self.save()

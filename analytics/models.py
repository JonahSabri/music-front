from django.db import models
from django.contrib.auth import get_user_model
from tracks.models import Track

User = get_user_model()


class TrackAnalytics(models.Model):
    """
    آمار و تحلیل برای هر ترک
    """
    track = models.OneToOneField(Track, on_delete=models.CASCADE, related_name='analytics')
    
    # آمار کلی
    total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌ها')
    unique_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان منحصر')
    playlist_saves = models.PositiveIntegerField(default=0, verbose_name='ذخیره در پلی‌لیست')
    average_listen_duration = models.DurationField(null=True, blank=True, verbose_name='میانگین زمان پخش')
    
    # آمار پلتفرم‌ها
    spotify_streams = models.PositiveIntegerField(default=0, verbose_name='پخش‌های Spotify')
    apple_music_streams = models.PositiveIntegerField(default=0, verbose_name='پخش‌های Apple Music')
    youtube_music_streams = models.PositiveIntegerField(default=0, verbose_name='پخش‌های YouTube Music')
    amazon_music_streams = models.PositiveIntegerField(default=0, verbose_name='پخش‌های Amazon Music')
    other_platforms_streams = models.PositiveIntegerField(default=0, verbose_name='پخش‌های سایر پلتفرم‌ها')
    
    # آمار جغرافیایی
    iran_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان ایران')
    usa_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان آمریکا')
    germany_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان آلمان')
    uk_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان انگلستان')
    canada_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان کانادا')
    australia_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان استرالیا')
    france_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان فرانسه')
    other_countries_listeners = models.PositiveIntegerField(default=0, verbose_name='شنوندگان سایر کشورها')
    
    # آمار زمانی
    last_updated = models.DateTimeField(auto_now=True, verbose_name='آخرین بروزرسانی')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    
    class Meta:
        verbose_name = 'آمار ترک'
        verbose_name_plural = 'آمار ترک‌ها'
    
    def __str__(self):
        return f'آمار {self.track.title}'


class DailyStreams(models.Model):
    """
    آمار پخش روزانه برای هر ترک
    """
    track = models.ForeignKey(Track, on_delete=models.CASCADE, related_name='daily_streams')
    date = models.DateField(verbose_name='تاریخ')
    streams = models.PositiveIntegerField(default=0, verbose_name='تعداد پخش')
    
    class Meta:
        verbose_name = 'پخش روزانه'
        verbose_name_plural = 'پخش‌های روزانه'
        unique_together = ['track', 'date']
    
    def __str__(self):
        return f'{self.track.title} - {self.date}'


class UserAnalytics(models.Model):
    """
    آمار کلی کاربر
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='analytics')
    
    # آمار کلی
    total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌ها')
    total_unique_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان منحصر')
    total_playlist_saves = models.PositiveIntegerField(default=0, verbose_name='مجموع ذخیره در پلی‌لیست')
    
    # آمار پلتفرم‌ها
    spotify_total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌های Spotify')
    apple_music_total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌های Apple Music')
    youtube_music_total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌های YouTube Music')
    amazon_music_total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌های Amazon Music')
    other_platforms_total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌های سایر پلتفرم‌ها')
    
    # آمار جغرافیایی
    iran_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان ایران')
    usa_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان آمریکا')
    germany_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان آلمان')
    uk_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان انگلستان')
    canada_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان کانادا')
    australia_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان استرالیا')
    france_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان فرانسه')
    other_countries_total_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان سایر کشورها')
    
    last_updated = models.DateTimeField(auto_now=True, verbose_name='آخرین بروزرسانی')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    
    class Meta:
        verbose_name = 'آمار کاربر'
        verbose_name_plural = 'آمار کاربران'
    
    def __str__(self):
        return f'آمار {self.user.artist_name or self.user.username}'


class AnalyticsReport(models.Model):
    """
    گزارش‌های تحلیلی
    """
    REPORT_TYPES = [
        ('weekly', 'هفتگی'),
        ('monthly', 'ماهانه'),
        ('quarterly', 'فصلی'),
        ('yearly', 'سالانه'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analytics_reports')
    report_type = models.CharField(max_length=20, choices=REPORT_TYPES, verbose_name='نوع گزارش')
    period_start = models.DateField(verbose_name='شروع دوره')
    period_end = models.DateField(verbose_name='پایان دوره')
    
    # خلاصه گزارش
    total_streams = models.PositiveIntegerField(default=0, verbose_name='مجموع پخش‌ها')
    total_unique_listeners = models.PositiveIntegerField(default=0, verbose_name='مجموع شنوندگان منحصر')
    total_playlist_saves = models.PositiveIntegerField(default=0, verbose_name='مجموع ذخیره در پلی‌لیست')
    
    # جزئیات گزارش (JSON)
    detailed_data = models.JSONField(default=dict, verbose_name='جزئیات گزارش')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    
    class Meta:
        verbose_name = 'گزارش تحلیلی'
        verbose_name_plural = 'گزارش‌های تحلیلی'
    
    def __str__(self):
        return f'گزارش {self.get_report_type_display()} - {self.user.artist_name or self.user.username}'

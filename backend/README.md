# AstroTunes Backend - Django API

بک‌اند Django برای پلتفرم توزیع موسیقی AstroTunes

## ویژگی‌ها

### 🎵 مدیریت ترک‌ها
- آپلود ترک موسیقی توسط کاربران
- بررسی و تایید ترک‌ها در پنل ادمین Django
- وضعیت‌های مختلف: در انتظار، تایید شده، رد شده، منتشر شده
- امکان ویرایش و مدیریت کامل در پنل ادمین

### 👤 مدیریت کاربران و نام هنری
- سیستم احراز هویت کامل (ثبت نام، ورود، خروج)
- نام هنری قابل تنظیم یک‌بار (پس از اولین آپلود قفل می‌شود)
- کاربران بدون اشتراک: 1 ترک رایگان
- کاربران با اشتراک: آپلود نامحدود

### 💳 سیستم اشتراک و پرداخت
- پرداخت کارت به کارت دستی
- فیلدهای پرداخت: تاریخ، ساعت، شناسه پیگیری، 4 رقم آخر کارت
- تایید پرداخت در پنل ادمین
- فعال‌سازی خودکار اشتراک پس از تایید

### 🎯 پنل ادمین Django
- مدیریت کامل ترک‌ها
- تایید/رد پرداخت‌ها
- مدیریت طرح‌های اشتراک
- مدیریت کاربران

## نصب و راه‌اندازی

### پیش‌نیازها
- Python 3.8+
- pip

### مراحل نصب

1. **نصب وابستگی‌ها**
```bash
cd backend
python -m venv venv

# فعال‌سازی محیط مجازی
# Windows:
.\venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

2. **اعمال Migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

3. **ایجاد سوپریوزر**
```bash
python manage.py createsuperuser
```

4. **ایجاد داده‌های اولیه (اختیاری)**
```bash
python manage.py shell
```

در shell:
```python
from payments.models import PaymentMethod
from subscriptions.models import SubscriptionPlan

# ایجاد روش پرداخت
PaymentMethod.objects.create(
    name="کارت اصلی",
    card_number="6037997123456789",
    card_holder_name="علی احمدی",
    bank_name="بانک ملی",
    is_active=True
)

# ایجاد طرح رایگان
SubscriptionPlan.objects.create(
    name="Free",
    name_fa="رایگان",
    price_irr=0,
    duration_days=365,
    max_tracks=1,
    is_active=True
)

# ایجاد طرح حرفه‌ای
SubscriptionPlan.objects.create(
    name="Professional",
    name_fa="حرفه‌ای",
    price_irr=59900,
    duration_days=365,
    max_tracks=None,  # نامحدود
    has_pre_save=True,
    has_content_id=True,
    has_splits=True,
    has_analytics=True,
    has_shazam=True,
    has_store_maximizer=True,
    has_priority_support=True,
    is_active=True
)
```

5. **اجرای سرور**
```bash
python manage.py runserver
```

سرور روی `http://localhost:8000` اجرا می‌شود.

## API Endpoints

### احراز هویت
- `POST /api/auth/register/` - ثبت نام
- `POST /api/auth/login/` - ورود
- `POST /api/auth/logout/` - خروج
- `GET /api/auth/me/` - دریافت اطلاعات کاربر
- `PUT /api/auth/me/` - ویرایش اطلاعات کاربر
- `GET /api/auth/check-artist-name/` - بررسی وضعیت نام هنری

### ترک‌ها
- `GET /api/tracks/` - لیست ترک‌های کاربر
- `POST /api/tracks/` - آپلود ترک جدید
- `GET /api/tracks/{id}/` - جزئیات ترک
- `PUT /api/tracks/{id}/` - ویرایش ترک
- `DELETE /api/tracks/{id}/` - حذف ترک
- `GET /api/tracks/can_upload/` - بررسی امکان آپلود
- `GET /api/tracks/pending/` - لیست ترک‌های در انتظار (ادمین)
- `POST /api/tracks/{id}/approve/` - تایید ترک (ادمین)
- `POST /api/tracks/{id}/reject/` - رد ترک (ادمین)

### اشتراک و پرداخت
- `GET /api/subscription-plans/` - لیست طرح‌های اشتراک
- `GET /api/payment-methods/` - لیست روش‌های پرداخت
- `GET /api/current-subscription/` - اطلاعات اشتراک فعلی
- `GET /api/payments/payments/` - لیست پرداخت‌های کاربر
- `POST /api/payments/payments/` - ثبت پرداخت جدید
- `GET /api/payments/payments/pending/` - لیست پرداخت‌های در انتظار (ادمین)
- `POST /api/payments/payments/{id}/approve/` - تایید پرداخت (ادمین)
- `POST /api/payments/payments/{id}/reject/` - رد پرداخت (ادمین)

## پنل ادمین Django

دسترسی به پنل ادمین: `http://localhost:8000/admin/`

### امکانات پنل ادمین:

#### 1. مدیریت ترک‌ها
- مشاهده لیست تمام ترک‌ها
- فیلتر بر اساس وضعیت، نوع انتشار، زبان
- پخش صوتی و مشاهده کاور
- تایید/رد دسته‌ای ترک‌ها
- افزودن یادداشت برای هر ترک

#### 2. مدیریت پرداخت‌ها
- مشاهده اطلاعات کامل پرداخت
- مشاهده تصویر رسید
- تایید پرداخت و فعال‌سازی خودکار اشتراک
- رد پرداخت با ذکر دلیل

#### 3. مدیریت کاربران
- مشاهده لیست کاربران
- بررسی وضعیت نام هنری (قفل/باز)
- مدیریت اطلاعات پرداخت کاربران

#### 4. مدیریت اشتراک‌ها
- ایجاد طرح‌های اشتراک جدید
- فعال/غیرفعال کردن طرح‌ها
- مشاهده لیست اشتراک‌های فعال

## مدل‌های دیتابیس

### User (کاربران)
- اطلاعات پایه: ایمیل، نام کاربری، رمز عبور
- نام هنری (قابل تنظیم یک‌بار)
- آدرس ولت USDT (برای دریافت درآمد)

### Track (ترک‌ها)
- اطلاعات انتشار: عنوان، نام هنرمند، تاریخ انتشار
- فایل‌ها: صوتی، کاور آرت
- متادیتا: ژانر، زبان، آهنگساز، شاعر
- وضعیت: pending, approved, rejected, published
- پلتفرم‌های انتخابی

### Subscription (اشتراک)
- کاربر و طرح اشتراک
- تاریخ شروع و پایان
- وضعیت فعال/غیرفعال

### Payment (پرداخت)
- اطلاعات کاربر و مبلغ
- اطلاعات واریز: تاریخ، ساعت، شناسه پیگیری
- تصویر رسید
- وضعیت: pending, approved, rejected

## لاجیک‌های کلیدی

### محدودیت آپلود
```python
# کاربر بدون اشتراک: فقط 1 ترک
# کاربر با اشتراک فعال: نامحدود
user.can_upload_track()  # بررسی امکان آپلود
```

### قفل نام هنری
```python
# پس از اولین آپلود، نام هنری قفل می‌شود
user.lock_artist_name()
# تلاش برای تغییر منجر به خطا می‌شود
```

### فعال‌سازی اشتراک
```python
# پس از تایید پرداخت در پنل ادمین
payment.approve()  # اشتراک خودکار فعال می‌شود
```

## اتصال به Frontend

Frontend (Next.js) باید به آدرس `http://localhost:8000/api/` درخواست بفرستد.

CORS برای `http://localhost:3000` فعال است.

### مثال درخواست از Frontend:

```javascript
// ثبت نام
const response = await fetch('http://localhost:8000/api/auth/register/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    username: 'artist1',
    email: 'artist@example.com',
    password: 'password123',
    password2: 'password123',
    artist_name: 'هنرمند جدید'
  })
});

// آپلود ترک
const formData = new FormData();
formData.append('title', 'عنوان آهنگ');
formData.append('audio_file', audioFile);
formData.append('cover_art', coverImage);
// ... سایر فیلدها

const response = await fetch('http://localhost:8000/api/tracks/', {
  method: 'POST',
  credentials: 'include',
  body: formData
});
```

## نکات امنیتی

1. **در production:**
   - `DEBUG = False` تنظیم کنید
   - `SECRET_KEY` را تغییر دهید
   - `ALLOWED_HOSTS` را تنظیم کنید
   - از HTTPS استفاده کنید

2. **محافظت از فایل‌ها:**
   - فایل‌های media در production روی یک storage امن قرار گیرند
   - از CDN برای سرو فایل‌های بزرگ استفاده شود

## پشتیبانی

برای سوالات و مشکلات، به مستندات Django مراجعه کنید:
- https://docs.djangoproject.com/
- https://www.django-rest-framework.org/

## مجوز

این پروژه برای استفاده شخصی AstroTunes ساخته شده است.


# راهنمای کامل اتصال Frontend به Backend

## ✅ کارهایی که انجام شده:

### 1. API Client (`src/lib/api.ts`)
- کلاینت کامل API برای تمام endpoints
- مدیریت CSRF tokens
- مدیریت خطاها

### 2. Auth Context (`src/contexts/AuthContext.tsx`)
- مدیریت state احراز هویت
- Login / Logout / Register
- بررسی خودکار وضعیت لاگین

### 3. صفحات متصل شده:
- ✅ Login (`src/app/login/page.tsx`)
- ✅ Signup (`src/app/signup/page.tsx`)
- ✅ Dashboard (`src/app/dashboard/page.tsx`)
- ✅ Sidebar با logout (`src/components/layout/DashboardSidebar.tsx`)

## 🚀 راه‌اندازی سریع

### مرحله 1: راه‌اندازی Backend

```bash
# Terminal 1 - Django Backend
cd D:\uiux\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

Backend روی `http://localhost:8000` اجرا می‌شود.

### مرحله 2: ایجاد Admin

```bash
# در همان terminal backend
python manage.py createsuperuser

# اطلاعات را وارد کنید:
Username: admin
Email: admin@astrotunes.com
Password: (رمز قوی)
```

### مرحله 3: راه‌اندازی Frontend

```bash
# Terminal 2 - Next.js Frontend
cd D:\uiux\astrotunes
npm run dev
```

Frontend روی `http://localhost:3000` اجرا می‌شود.

## 📋 تست فلوی کامل

### تست 1: ثبت نام کاربر جدید

1. به `http://localhost:3000/signup` بروید
2. فرم را پر کنید:
   - نام هنری: (اختیاری) مثل "هنرمند تست"
   - ایمیل: `test@example.com`
   - رمز عبور: `test1234`
   - تکرار رمز عبور: `test1234`
   - ✅ قوانین را بپذیرید
3. روی "ثبت نام رایگان" کلیک کنید
4. باید به داشبورد منتقل شوید

### تست 2: بررسی داشبورد

پس از لاگین، در داشبورد باید ببینید:
- نام شما در عنوان
- وضعیت اشتراک: "رایگان"
- تعداد ترک‌ها: 0
- وضعیت آپلود: "1 ترک رایگان باقی‌مانده"

### تست 3: آپلود اولین ترک (در حال توسعه)

صفحه آپلود هنوز در حال توسعه است. برای تست سریع:

1. به `http://localhost:8000/admin/` بروید
2. با اکانت admin login کنید
3. از منوی `Tracks` یک ترک تستی ایجاد کنید:
   - User: کاربری که ساختید را انتخاب کنید
   - Title: "ترک تست"
   - Release date: تاریخ امروز
   - بقیه فیلدها را پر کنید
   - Status: "pending" بگذارید
4. ذخیره کنید

### تست 4: تایید ترک در پنل Admin

1. در پنل Admin Django روی ترک کلیک کنید
2. Status را به "approved" تغییر دهید
3. ذخیره کنید
4. به داشبورد frontend برگردید
5. ترک شما باید ظاهر شود

### تست 5: خرید اشتراک

#### مرحله A: ایجاد روش پرداخت (اگر وجود ندارد)

در پنل Admin Django:
1. `Payments > Payment methods > Add`
2. اطلاعات کارت را وارد کنید:
   - Card number: `6037997123456789`
   - Card holder: `علی احمدی`
   - Bank: `بانک ملی`
   - ✅ Is active
3. ذخیره کنید

#### مرحله B: ایجاد پرداخت

1. در پنل Admin Django: `Payments > Payments > Add payment`
2. اطلاعات را وارد کنید:
   - User: کاربر test
   - Subscription plan: "Professional"
   - Amount: 59900
   - Payment method: روشی که ساختید
   - Transfer date: "1404/01/15"
   - Transfer time: "14:30"
   - Tracking code: "123456789"
   - Status: "pending"
3. ذخیره کنید

#### مرحله C: تایید پرداخت

1. در لیست Payments روی پرداختی که ساختید کلیک کنید
2. از dropdown "Action" گزینه "Approve payments" را انتخاب کنید
3. کلیک روی "Go"
4. اشتراک خودکار فعال می‌شود!

#### مرحله D: بررسی فعال شدن اشتراک

1. به داشبورد frontend برگردید
2. رفرش کنید
3. وضعیت اشتراک باید "حرفه‌ای" نمایش دهد
4. وضعیت آپلود باید "نامحدود" باشد

### تست 6: Logout

1. در sidebar دکمه "خروج" 🚪 را کلیک کنید
2. باید به صفحه اصلی منتقل شوید
3. دسترسی به `/dashboard` نباید داشته باشید

## 🔧 صفحات در حال توسعه

این صفحات هنوز به API متصل نشده‌اند و نیاز به تکمیل دارند:

### 1. صفحه آپلود (`/dashboard/upload`)
- فرم کامل آپلود ترک
- آپلود فایل صوتی و کاور
- مدیریت نام هنری
- ارسال به backend

### 2. صفحه موسیقی من (`/dashboard/music`)
- لیست تمام ترک‌های کاربر
- فیلتر و جستجو
- ویرایش ترک‌ها

### 3. صفحه تنظیمات (`/dashboard/settings`)
- نمایش طرح‌های اشتراک
- فرم پرداخت کارت به کارت
- آپلود رسید

### 4. صفحه کیف پول (`/dashboard/wallet`)
- نمایش درآمد
- تنظیمات آدرس USDT

## 📝 نکات مهم

### 1. CSRF Token
Django به صورت خودکار CSRF token ارسال می‌کند. در API client از cookie استفاده می‌شود:

```typescript
const csrfToken = getCookie('csrftoken');
if (csrfToken && options.method !== 'GET') {
  headers['X-CSRFToken'] = csrfToken;
}
```

### 2. Credentials
همه درخواست‌ها با `credentials: 'include'` ارسال می‌شوند تا session cookie ارسال شود.

### 3. CORS
در backend Django، CORS برای `http://localhost:3000` فعال شده است.

### 4. نام هنری
- اگر کاربر در signup نام هنری وارد نکند، در اولین آپلود درخواست می‌شود
- پس از اولین آپلود، نام هنری قفل می‌شود
- Backend این قفل را enforce می‌کند

## 🐛 رفع مشکلات رایج

### مشکل 1: CORS Error

**علت:** Backend اجرا نشده یا CORS تنظیم نشده

**راه حل:**
```python
# در backend/astrotunes_backend/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True
```

### مشکل 2: 403 Forbidden

**علت:** CSRF token ارسال نشده

**راه حل:**
- اطمینان حاصل کنید که `credentials: 'include'` در fetch وجود دارد
- اولین بار صفحه را reload کنید تا cookie دریافت شود

### مشکل 3: User null است

**علت:** Session منقضی شده یا logout شده

**راه حل:**
- دوباره login کنید
- در DevTools > Application > Cookies بررسی کنید که `sessionid` وجود دارد

### مشکل 4: آپلود فایل کار نمی‌کند

**علت:** Content-Type اشتباه است

**راه حل:**
```typescript
// برای FormData، Content-Type را set نکنید
// مرورگر خودکار multipart/form-data می‌فرستد
if (!(options.body instanceof FormData)) {
  headers['Content-Type'] = 'application/json';
}
```

## 📦 API Endpoints موجود

```
POST   /api/auth/register/         - ثبت نام
POST   /api/auth/login/            - ورود
POST   /api/auth/logout/           - خروج
GET    /api/auth/me/               - اطلاعات کاربر فعلی
PUT    /api/auth/me/               - ویرایش پروفایل
GET    /api/auth/check-artist-name/ - بررسی نام هنری

GET    /api/tracks/                - لیست ترک‌های کاربر
POST   /api/tracks/                - آپلود ترک جدید
GET    /api/tracks/{id}/           - جزئیات یک ترک
PUT    /api/tracks/{id}/           - ویرایش ترک
DELETE /api/tracks/{id}/           - حذف ترک
GET    /api/tracks/can_upload/     - بررسی امکان آپلود

GET    /api/subscription-plans/    - لیست طرح‌های اشتراک
GET    /api/payment-methods/       - روش‌های پرداخت موجود
GET    /api/current-subscription/  - اشتراک فعلی کاربر
POST   /api/payments/payments/     - ثبت پرداخت جدید
GET    /api/payments/payments/     - لیست پرداخت‌های کاربر
```

## 🎯 بعدی چیست؟

1. **تکمیل صفحه آپلود**: فایل `page_connected.tsx` را با فرم کامل replace کنید
2. **صفحه موسیقی من**: نمایش لیست ترک‌ها با pagination
3. **صفحه تنظیمات**: پرداخت اشتراک با کارت به کارت
4. **صفحه کیف پول**: مدیریت درآمد و برداشت

همه چیز آماده است! Backend کار می‌کند و Frontend با API ارتباط دارد. ✅


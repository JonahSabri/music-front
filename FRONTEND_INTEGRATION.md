# راهنمای اتصال Frontend به Backend

## مرحله 1: راه‌اندازی Backend

```bash
cd D:\uiux\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

Backend روی `http://localhost:8000` اجرا می‌شود.

## مرحله 2: ایجاد سوپریوزر (برای دسترسی به پنل ادمین)

```bash
python manage.py createsuperuser
```

اطلاعات درخواستی را وارد کنید:
- Username: admin
- Email: admin@astrotunes.com
- Password: (رمز دلخواه شما)

## مرحله 3: دسترسی به پنل ادمین Django

مرورگر را باز کنید و به آدرس زیر بروید:
```
http://localhost:8000/admin/
```

## مرحله 4: اتصال از Frontend (Next.js)

### ساختار API در Frontend

در فولدر `astrotunes/src` یک فایل `lib/api.js` ایجاد کنید:

```javascript
// astrotunes/src/lib/api.js

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // =============== AUTH APIs ===============
  
  async register(data) {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  async logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async updateCurrentUser(data) {
    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async checkArtistName() {
    const response = await fetch(`${API_BASE_URL}/auth/check-artist-name/`, {
      credentials: 'include',
    });
    return response.json();
  },

  // =============== TRACK APIs ===============
  
  async getTracks() {
    const response = await fetch(`${API_BASE_URL}/tracks/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async getTrack(id) {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async uploadTrack(formData) {
    const response = await fetch(`${API_BASE_URL}/tracks/`, {
      method: 'POST',
      credentials: 'include',
      body: formData // FormData شامل فایل‌ها
    });
    return response.json();
  },

  async canUploadTrack() {
    const response = await fetch(`${API_BASE_URL}/tracks/can_upload/`, {
      credentials: 'include',
    });
    return response.json();
  },

  // =============== PAYMENT & SUBSCRIPTION APIs ===============
  
  async getSubscriptionPlans() {
    const response = await fetch(`${API_BASE_URL}/subscription-plans/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async getPaymentMethods() {
    const response = await fetch(`${API_BASE_URL}/payment-methods/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async getCurrentSubscription() {
    const response = await fetch(`${API_BASE_URL}/current-subscription/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async submitPayment(formData) {
    const response = await fetch(`${API_BASE_URL}/payments/payments/`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    return response.json();
  },

  async getPayments() {
    const response = await fetch(`${API_BASE_URL}/payments/payments/`, {
      credentials: 'include',
    });
    return response.json();
  }
};
```

### استفاده در کامپوننت‌ها

#### مثال 1: صفحه ثبت نام (signup/page.tsx)

```javascript
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    artist_name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.register(formData);
      if (result.user) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ... بقیه کامپوننت
}
```

#### مثال 2: صفحه آپلود ترک (dashboard/upload/page.tsx)

```javascript
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function UploadMusicPage() {
  const [canUpload, setCanUpload] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    checkUploadPermission();
  }, []);

  const checkUploadPermission = async () => {
    const result = await api.canUploadTrack();
    setCanUpload(result.can_upload);
    setArtistName(result.artist_name);
    setIsLocked(result.artist_name_locked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اگر نام هنری وجود نداشت، درخواست کنید
    if (!artistName && !isLocked) {
      const name = prompt('لطفا نام هنری خود را وارد کنید (بعد از این قابل تغییر نیست):');
      if (!name) return;
      setArtistName(name);
    }

    const formData = new FormData();
    formData.append('title', 'عنوان آهنگ');
    formData.append('audio_file', audioFile);
    formData.append('cover_art', coverImage);
    formData.append('artist_name', artistName);
    formData.append('release_date', '2025-05-01');
    formData.append('primary_genre', 'Pop');
    formData.append('language', 'persian');
    formData.append('release_type', 'single');
    formData.append('platforms', JSON.stringify(['spotify', 'apple', 'amazon']));

    try {
      const result = await api.uploadTrack(formData);
      alert('ترک با موفقیت آپلود شد و برای بررسی ارسال گردید');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ... بقیه کامپوننت
}
```

#### مثال 3: صفحه پرداخت اشتراک

```javascript
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const plansData = await api.getSubscriptionPlans();
    const methodsData = await api.getPaymentMethods();
    setPlans(plansData);
    setPaymentMethods(methodsData);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subscription_plan', selectedPlan.id);
    formData.append('amount', selectedPlan.price_irr);
    formData.append('payment_method', paymentMethods[0].id);
    formData.append('transfer_date', '1404/01/15');
    formData.append('transfer_time', '14:30');
    formData.append('tracking_code', '123456789');
    // یا
    formData.append('last_four_digits', '1234');
    
    // اگر تصویر رسید دارید:
    if (receiptImage) {
      formData.append('receipt_image', receiptImage);
    }

    try {
      const result = await api.submitPayment(formData);
      alert('پرداخت ثبت شد و پس از تایید اشتراک فعال می‌شود');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ... بقیه کامپوننت
}
```

## مرحله 5: نکات مهم

### 1. نمایش شماره کارت در صفحه پرداخت

```javascript
const [paymentMethod, setPaymentMethod] = useState(null);

useEffect(() => {
  const loadPaymentMethod = async () => {
    const methods = await api.getPaymentMethods();
    if (methods.length > 0) {
      setPaymentMethod(methods[0]);
    }
  };
  loadPaymentMethod();
}, []);

// نمایش در UI:
{paymentMethod && (
  <div>
    <p>شماره کارت: {paymentMethod.card_number_display}</p>
    <p>به نام: {paymentMethod.card_holder_name}</p>
    <p>بانک: {paymentMethod.bank_name}</p>
  </div>
)}
```

### 2. بررسی نام هنری قبل از آپلود

```javascript
// در هنگام آپلود، اگر نام هنری ندارد، درخواست کنید
const checkAndUpload = async () => {
  const artistInfo = await api.checkArtistName();
  
  if (!artistInfo.artist_name) {
    // نمایش dialog برای دریافت نام هنری
    const name = prompt('نام هنری خود را وارد کنید (قابل تغییر نیست):');
    if (name) {
      // افزودن به formData
      formData.append('artist_name', name);
    }
  } else if (artistInfo.is_locked) {
    // نام هنری قفل شده، نمایش آن
    console.log('Artist name:', artistInfo.artist_name);
  }
};
```

### 3. بررسی وضعیت اشتراک

```javascript
const checkSubscription = async () => {
  const sub = await api.getCurrentSubscription();
  
  if (sub.has_subscription) {
    console.log('Plan:', sub.plan.name);
    console.log('Valid until:', sub.end_date);
  } else {
    // نمایش پیام برای خرید اشتراک
    console.log('No active subscription');
  }
};
```

## مرحله 6: فلوی کامل کاربر

1. **ثبت نام** → API: `/api/auth/register/`
2. **ورود** → API: `/api/auth/login/`
3. **بررسی امکان آپلود** → API: `/api/tracks/can_upload/`
4. **آپلود ترک اول** (رایگان) → API: `/api/tracks/`
   - اگر نام هنری ندارد، درخواست می‌شود
   - نام هنری قفل می‌شود
5. **تلاش برای آپلود دوم** → خطا: "نیاز به اشتراک"
6. **مشاهده طرح‌های اشتراک** → API: `/api/subscription-plans/`
7. **انتخاب طرح و پرداخت** → API: `/api/payments/payments/`
   - نمایش شماره کارت
   - دریافت اطلاعات واریز
8. **در پنل ادمین Django:**
   - تایید پرداخت → اشتراک فعال می‌شود
9. **کاربر می‌تواند ترک‌های نامحدود آپلود کند**
10. **در پنل ادمین Django:**
    - بررسی و تایید/رد ترک‌ها
    - ویرایش اطلاعات ترک‌ها

## مرحله 7: راه‌اندازی همزمان

### Terminal 1 - Backend:
```bash
cd D:\uiux\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

### Terminal 2 - Frontend:
```bash
cd D:\uiux\astrotunes
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api/`
- Django Admin: `http://localhost:8000/admin/`

## پنل ادمین Django

دسترسی: `http://localhost:8000/admin/`

### کارهایی که مدیر انجام می‌دهد:

1. **مدیریت ترک‌ها** (Tracks):
   - مشاهده ترک‌های در انتظار بررسی
   - پخش فایل صوتی
   - مشاهده کاور
   - تایید یا رد ترک
   - افزودن یادداشت

2. **مدیریت پرداخت‌ها** (Payments):
   - مشاهده پرداخت‌های در انتظار
   - بررسی اطلاعات واریز
   - مشاهده تصویر رسید
   - تایید پرداخت (اشتراک خودکار فعال می‌شود)
   - رد پرداخت با دلیل

3. **مدیریت کاربران** (Users):
   - مشاهده لیست کاربران
   - بررسی وضعیت نام هنری
   - مشاهده اشتراک‌های فعال

این راهنما کامل است و همه چیز آماده استفاده است! 🚀


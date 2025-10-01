'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router, mounted]);

  if (!mounted || authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebula mx-auto mb-4"></div>
            <div className="text-starlight text-xl">در حال بارگذاری...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <DashboardLayout>
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            تنظیمات حساب
          </h1>
          <p className="text-muted">مدیریت اطلاعات کاربری، امنیت و پرداخت</p>
        </div>

        {/* Profile */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">اطلاعات کاربری</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-starlight font-medium mb-2">نام نمایشی</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" placeholder="Display Name" />
            </div>
            <div>
              <label className="block text-starlight font-medium mb-2">ایمیل</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="primary" glow>💾 ذخیره تغییرات</Button>
          </div>
        </GlassCard>

        {/* Security */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">امنیت</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="password" placeholder="Current Password" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" />
            <input type="password" placeholder="New Password" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" />
            <input type="password" placeholder="Confirm New Password" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" />
          </div>
          <div className="mt-4">
            <Button variant="outline">🔐 تغییر رمز عبور</Button>
          </div>
        </GlassCard>

        {/* Subscription - Link to subscription page */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-2">اشتراک</h2>
          <p className="text-muted mb-4">مدیریت اشتراک و پرداخت‌ها</p>
          <div className="flex items-center gap-3">
            <Button variant="primary" glow onClick={() => window.location.href = '/dashboard/subscription'}>
              💎 مدیریت اشتراک
            </Button>
          </div>
        </GlassCard>

        {/* Payments - link to wallet */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-2">پرداخت‌ها</h2>
          <p className="text-muted">تنظیمات پرداخت از بخش کیف پول قابل مدیریت است (TRC20).</p>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}



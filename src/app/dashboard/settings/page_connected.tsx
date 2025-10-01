'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!user) {
      router.push('/login');
    } else {
      loadData();
    }
  }, [user, router, mounted]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [subRes, plansRes] = await Promise.all([
        api.getCurrentSubscription(),
        api.getSubscriptionPlans()
      ]);

      if (subRes.data) {
        setSubscription(subRes.data);
      }
      if (plansRes.data) {
        setPlans(plansRes.data);
      }
    } catch (error) {
      console.error('Error loading settings data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-starlight text-xl">در حال بارگذاری...</div>
        </div>
      </DashboardLayout>
    );
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
              <label className="block text-starlight font-medium mb-2">نام هنری</label>
              <input 
                type="text" 
                value={user?.artist_name || ''} 
                disabled={user?.artist_name_locked}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" 
                placeholder="نام هنری" 
              />
              {user?.artist_name_locked && (
                <p className="text-muted text-xs mt-1">⚠️ نام هنری قفل شده است</p>
              )}
            </div>
            <div>
              <label className="block text-starlight font-medium mb-2">ایمیل</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" 
                placeholder="you@example.com" 
              />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="primary" glow>💾 ذخیره تغییرات</Button>
          </div>
        </GlassCard>

        {/* Subscription */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-2">اشتراک</h2>
          {subscription?.has_subscription ? (
            <div>
              <p className="text-muted mb-4">
                پلن فعلی: <span className="text-starlight font-bold">{subscription.plan.name}</span>
              </p>
              <p className="text-muted mb-4">
                اعتبار تا: <span className="text-starlight">{new Date(subscription.end_date).toLocaleDateString('fa-IR')}</span>
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline">❌ لغو اشتراک</Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-muted mb-4">پلن فعلی: رایگان</p>
              <p className="text-muted mb-6">با خرید اشتراک حرفه‌ای، آپلود نامحدود داشته باشید</p>
              
              {/* Subscription Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(plans) && plans.map((plan: any) => (
                  <div key={plan.id} className="border border-white/20 rounded-lg p-6 hover:border-nebula transition-colors">
                    <h3 className="text-xl font-bold text-starlight mb-2">{plan.name_fa}</h3>
                    <div className="text-3xl font-bold text-gradient-nebula mb-4">{plan.price_display}</div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-muted text-sm">
                        <span className="text-green-400 ml-2">✓</span>
                        {plan.max_tracks_display} ترک
                      </li>
                      {plan.has_analytics && (
                        <li className="flex items-center text-muted text-sm">
                          <span className="text-green-400 ml-2">✓</span>
                          آمار و تحلیل
                        </li>
                      )}
                      {plan.has_pre_save && (
                        <li className="flex items-center text-muted text-sm">
                          <span className="text-green-400 ml-2">✓</span>
                          Pre-Save Links
                        </li>
                      )}
                      {plan.has_priority_support && (
                        <li className="flex items-center text-muted text-sm">
                          <span className="text-green-400 ml-2">✓</span>
                          پشتیبانی اولویت‌دار
                        </li>
                      )}
                    </ul>
                    <Button 
                      variant={plan.name === 'Professional' ? 'primary' : 'outline'} 
                      className="w-full"
                      glow={plan.name === 'Professional'}
                      onClick={() => router.push('/dashboard/payment')}
                    >
                      {plan.name === 'Professional' ? 'خرید اشتراک' : 'رایگان'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        {/* Security */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">امنیت</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="password" placeholder="رمز عبور فعلی" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" />
            <input type="password" placeholder="رمز عبور جدید" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" />
            <input type="password" placeholder="تکرار رمز عبور جدید" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula" />
          </div>
          <div className="mt-4">
            <Button variant="outline">🔐 تغییر رمز عبور</Button>
          </div>
        </GlassCard>

        {/* Payments - link to wallet */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-2">پرداخت‌ها</h2>
          <p className="text-muted mb-4">تنظیمات پرداخت از بخش کیف پول قابل مدیریت است (TRC20).</p>
          <Link href="/dashboard/wallet">
            <Button variant="primary" glow>💰 مدیریت کیف پول</Button>
          </Link>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

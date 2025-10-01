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

export default function SubscriptionPage() {
  const { user, authLoading } = useAuth();
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
    
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadData();
    }
  }, [user, authLoading, router, mounted]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [subRes, plansRes] = await Promise.all([
        api.getCurrentSubscription(),
        api.getSubscriptionPlans()
      ]);

      if (subRes.data && !subRes.error) {
        setSubscription(subRes.data);
      } else {
        setSubscription(null);
      }
      
      if (plansRes.data && !plansRes.error) {
        setPlans(plansRes.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error('Error loading subscription data:', error);
      setSubscription(null);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || authLoading || isLoading) {
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
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            اشتراک و پرداخت
          </h1>
          <p className="text-muted">مدیریت اشتراک، پرداخت و کیف پول</p>
        </div>

        {/* Current Subscription Status */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">وضعیت اشتراک فعلی</h2>
          {subscription?.has_subscription ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-starlight">{subscription.plan.name_fa}</h3>
                  <p className="text-muted">اشتراک فعال</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-muted">تاریخ شروع:</span>
                  <span className="text-starlight font-bold mr-2">
                    {new Date(subscription.start_date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <div>
                  <span className="text-muted">تاریخ انقضا:</span>
                  <span className="text-starlight font-bold mr-2">
                    {new Date(subscription.end_date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => router.push('/dashboard/subscription/payment')}>
                  💳 تمدید اشتراک
                </Button>
                <Button variant="outline" className="text-red-400 hover:bg-red-500/10">
                  ❌ لغو اشتراک
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-starlight">اشتراک رایگان</h3>
                  <p className="text-muted">۱ ترک رایگان - آپلود نامحدود نیاز به اشتراک دارد</p>
                </div>
                <div className="text-3xl">🆓</div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="primary" glow onClick={() => router.push('/dashboard/subscription/plans')}>
                  💎 ارتقا به حرفه‌ای
                </Button>
                <Link href="/dashboard/upload">
                  <Button variant="outline">
                    🚀 آپلود ترک رایگان
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Payment */}
          <Link href="/dashboard/subscription/payment">
            <GlassCard variant="hover-glow" className="p-6 group cursor-pointer" animated>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted font-bold">پرداخت</span>
                <div className="w-12 h-12 rounded-xl gradient-supernova flex items-center justify-center text-2xl glow-gold group-hover:rotate-12 transition-transform duration-300">
                  💳
                </div>
              </div>
              <div className="text-starlight font-bold mb-2">خرید اشتراک</div>
              <div className="text-muted text-sm">پرداخت کارت به کارت</div>
            </GlassCard>
          </Link>

          {/* Wallet */}
          <Link href="/dashboard/subscription/wallet">
            <GlassCard variant="hover-glow" className="p-6 group cursor-pointer" animated>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted font-bold">کیف پول</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  💰
                </div>
              </div>
              <div className="text-starlight font-bold mb-2">مدیریت درآمد</div>
              <div className="text-muted text-sm">برداشت TRC20</div>
            </GlassCard>
          </Link>

          {/* History */}
          <Link href="/dashboard/subscription/history">
            <GlassCard variant="hover-glow" className="p-6 group cursor-pointer" animated>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted font-bold">تاریخچه</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>
              </div>
              <div className="text-starlight font-bold mb-2">تراکنش‌ها</div>
              <div className="text-muted text-sm">پرداخت و برداشت</div>
            </GlassCard>
          </Link>
        </div>

        {/* Subscription Plans Preview */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">پلن‌های اشتراک</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(plans) && plans.map((plan: any) => (
              <div key={plan.id} className={`border rounded-lg p-6 hover:border-nebula transition-colors ${
                plan.name === 'Professional' ? 'border-nebula bg-nebula/5' : 'border-white/20'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-starlight">{plan.name_fa}</h3>
                  {plan.name === 'Professional' && (
                    <span className="px-3 py-1 bg-nebula text-white text-xs rounded-full">محبوب</span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gradient-nebula mb-4">{plan.price_display}</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-muted text-sm">
                    <span className="text-green-400 ml-2">✓</span>
                    {plan.max_tracks_display} ترک
                  </li>
                  {plan.has_analytics && (
                    <li className="flex items-center text-muted text-sm">
                      <span className="text-green-400 ml-2">✓</span>
                      آمار و تحلیل پیشرفته
                    </li>
                  )}
                  {plan.has_pre_save && (
                    <li className="flex items-center text-muted text-sm">
                      <span className="text-green-400 ml-2">✓</span>
                      لینک‌های Pre-Save
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
                  onClick={() => router.push('/dashboard/subscription/payment')}
                >
                  {plan.name === 'Professional' ? 'خرید اشتراک' : 'رایگان'}
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

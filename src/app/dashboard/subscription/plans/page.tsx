'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function PlansPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
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
      const [plansRes, subRes] = await Promise.all([
        api.getSubscriptionPlans(),
        api.getCurrentSubscription()
      ]);

      if (plansRes.data) {
        setPlans(plansRes.data);
      }
      if (subRes.data) {
        setCurrentSubscription(subRes.data);
      }
    } catch (error) {
      console.error('Error loading plans data:', error);
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
            پلن‌های اشتراک
          </h1>
          <p className="text-muted">انتخاب بهترین پلن برای نیازهای موسیقی شما</p>
        </div>

        {/* Current Subscription Status */}
        {currentSubscription && (
          <GlassCard variant="default" className="p-6 mb-8" animated>
            <h2 className="text-2xl font-bold text-starlight mb-4">اشتراک فعلی</h2>
            {currentSubscription.has_subscription ? (
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-starlight">{currentSubscription.plan.name_fa}</h3>
                  <p className="text-muted">
                    اعتبار تا: {new Date(currentSubscription.end_date).toLocaleDateString('fa-IR')}
                  </p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-starlight">اشتراک رایگان</h3>
                  <p className="text-muted">۱ ترک رایگان - برای آپلود نامحدود اشتراک خریداری کنید</p>
                </div>
                <div className="text-3xl">🆓</div>
              </div>
            )}
          </GlassCard>
        )}

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(plans) && plans.map((plan: any) => (
            <GlassCard 
              key={plan.id} 
              variant={plan.name === 'Professional' ? 'hover-glow' : 'default'} 
              className={`p-8 relative ${
                plan.name === 'Professional' ? 'border-nebula bg-nebula/5' : ''
              }`} 
              animated
            >
              {plan.name === 'Professional' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-2 bg-nebula text-white text-sm rounded-full font-bold">
                    محبوب
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-starlight mb-2">{plan.name_fa}</h3>
                <div className="text-4xl font-black text-gradient-nebula mb-4">{plan.price_display}</div>
                <p className="text-muted">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-muted">
                  <span className="text-green-400 ml-3">✓</span>
                  {plan.max_tracks_display} ترک
                </li>
                {plan.has_analytics && (
                  <li className="flex items-center text-muted">
                    <span className="text-green-400 ml-3">✓</span>
                    آمار و تحلیل پیشرفته
                  </li>
                )}
                {plan.has_pre_save && (
                  <li className="flex items-center text-muted">
                    <span className="text-green-400 ml-3">✓</span>
                    لینک‌های Pre-Save
                  </li>
                )}
                {plan.has_priority_support && (
                  <li className="flex items-center text-muted">
                    <span className="text-green-400 ml-3">✓</span>
                    پشتیبانی اولویت‌دار
                  </li>
                )}
                <li className="flex items-center text-muted">
                  <span className="text-green-400 ml-3">✓</span>
                  انتشار در بیش از ۱۵۰ پلتفرم
                </li>
                <li className="flex items-center text-muted">
                  <span className="text-green-400 ml-3">✓</span>
                  حفظ ۱۰۰٪ درآمد
                </li>
              </ul>

              <Button 
                variant={plan.name === 'Professional' ? 'primary' : 'outline'} 
                className="w-full"
                glow={plan.name === 'Professional'}
                onClick={() => {
                  if (plan.name === 'Professional') {
                    router.push('/dashboard/subscription/payment');
                  }
                }}
              >
                {plan.name === 'Professional' ? 'خرید اشتراک' : 'رایگان'}
              </Button>
            </GlassCard>
          ))}
        </div>

        {/* Features Comparison */}
        <GlassCard variant="default" className="p-6 mt-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6 text-center">مقایسه ویژگی‌ها</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right py-4 px-6 text-starlight font-bold">ویژگی</th>
                  <th className="text-center py-4 px-6 text-starlight font-bold">رایگان</th>
                  <th className="text-center py-4 px-6 text-starlight font-bold">حرفه‌ای</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 text-muted">تعداد ترک</td>
                  <td className="text-center py-4 px-6 text-starlight">۱ ترک</td>
                  <td className="text-center py-4 px-6 text-starlight">نامحدود</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 text-muted">آمار و تحلیل</td>
                  <td className="text-center py-4 px-6 text-muted">❌</td>
                  <td className="text-center py-4 px-6 text-green-400">✅</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 text-muted">Pre-Save Links</td>
                  <td className="text-center py-4 px-6 text-muted">❌</td>
                  <td className="text-center py-4 px-6 text-green-400">✅</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 text-muted">پشتیبانی اولویت‌دار</td>
                  <td className="text-center py-4 px-6 text-muted">❌</td>
                  <td className="text-center py-4 px-6 text-green-400">✅</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-muted">درآمد</td>
                  <td className="text-center py-4 px-6 text-starlight">۱۰۰٪</td>
                  <td className="text-center py-4 px-6 text-starlight">۱۰۰٪</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

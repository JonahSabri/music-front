'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    subscriptionPlan: '',
    transferDate: '',
    transferTime: '',
    trackingId: '',
    lastFourDigits: '',
    amount: '',
    notes: ''
  });

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
      const [cardsRes, plansRes] = await Promise.all([
        api.getCards(),
        api.getSubscriptionPlans()
      ]);

      if (cardsRes.data && !cardsRes.error) {
        setCards(cardsRes.data);
      }
      
      if (plansRes.data && !plansRes.error && Array.isArray(plansRes.data)) {
        setSubscriptionPlans(plansRes.data);
        // انتخاب اشتراک حرفه‌ای به صورت پیش‌فرض
        const professionalPlan = plansRes.data.find((plan: any) => plan.name === 'professional');
        if (professionalPlan) {
          setSelectedPlan(professionalPlan);
          setFormData(prev => ({
            ...prev,
            subscriptionPlan: professionalPlan.id,
            amount: professionalPlan.price_irr.toString()
          }));
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const submitData = {
        subscription_plan: formData.subscriptionPlan,
        transfer_date: formData.transferDate,
        transfer_time: formData.transferTime,
        tracking_id: formData.trackingId,
        last_four_digits: formData.lastFourDigits,
        amount: formData.amount,
        user_notes: formData.notes
      };

      const result = await api.createPayment(submitData);
      
      if (result.data && !result.error) {
        setSuccess('✅ درخواست پرداخت با موفقیت ارسال شد! پس از تایید ادمین، اشتراک شما فعال خواهد شد.');
        setFormData({
          subscriptionPlan: selectedPlan?.id || '',
          transferDate: '',
          transferTime: '',
          trackingId: '',
          lastFourDigits: '',
          amount: selectedPlan?.price_irr?.toString() || '',
          notes: ''
        });
      } else {
        setError(result.error || 'خطا در ارسال درخواست پرداخت');
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      setError('خطا در ارسال درخواست پرداخت');
    } finally {
      setIsSubmitting(false);
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
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            خرید اشتراک
          </h1>
          <p className="text-muted">پرداخت کارت به کارت برای فعال‌سازی اشتراک حرفه‌ای</p>
        </div>

        {/* Payment Info */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">اطلاعات پرداخت</h2>
          
          {/* توضیحات پرداخت */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm">
              <strong>توضیحات مهم:</strong> به دلایل تحریم‌های اروپا و آمریکا و فعال شدن مکانیسم ماشه و همچنین مالیات، پرداخت فقط از طریق کارت به کارت فعال است.
            </p>
          </div>

          {/* کارت‌های بانکی */}
          {cards.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-starlight mb-3">کارت‌های بانکی</h3>
              {cards.map((card: any) => (
                <div key={card.id} className="p-4 bg-white/5 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-starlight">{card.get_bank_display}</h4>
                    <span className="text-2xl">💳</span>
                  </div>
                  <div className="bg-void/50 p-3 rounded-lg">
                    <div className="text-starlight font-mono text-lg">{card.card_number}</div>
                    <div className="text-muted text-sm mt-1">نام صاحب کارت: {card.card_holder_name}</div>
                  </div>
                  {card.description && (
                    <div className="text-muted text-sm mt-2">{card.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* اشتراک حرفه‌ای */}
          {selectedPlan && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-400 text-sm">
                💡 مبلغ اشتراک حرفه‌ای: <strong>{selectedPlan.price_irr.toLocaleString()} تومان</strong>
              </p>
            </div>
          )}
        </GlassCard>

        {/* Payment Form */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">اطلاعات واریز</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subscription Plan Selection */}
            <div>
              <label htmlFor="subscriptionPlan" className="block text-starlight font-medium mb-2">
                طرح اشتراک
              </label>
              <select
                id="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={(e) => {
                  const plan = Array.isArray(subscriptionPlans) 
                    ? subscriptionPlans.find((p: any) => p.id.toString() === e.target.value)
                    : null;
                  setSelectedPlan(plan);
                  setFormData({
                    ...formData, 
                    subscriptionPlan: e.target.value,
                    amount: plan?.price_irr?.toString() || ''
                  });
                }}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                required
              >
                <option value="">انتخاب کنید...</option>
                {Array.isArray(subscriptionPlans) && subscriptionPlans.map((plan: any) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name_fa} - {plan.price_irr.toLocaleString()} تومان
                  </option>
                ))}
              </select>
            </div>

            {/* Transfer Date */}
            <div>
              <label htmlFor="transferDate" className="block text-starlight font-medium mb-2">
                تاریخ واریز
              </label>
              <input
                type="date"
                id="transferDate"
                value={formData.transferDate}
                onChange={(e) => setFormData({...formData, transferDate: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                required
              />
            </div>

            {/* Transfer Time */}
            <div>
              <label htmlFor="transferTime" className="block text-starlight font-medium mb-2">
                ساعت واریز
              </label>
              <input
                type="time"
                id="transferTime"
                value={formData.transferTime}
                onChange={(e) => setFormData({...formData, transferTime: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                required
              />
            </div>

            {/* Tracking ID */}
            <div>
              <label htmlFor="trackingId" className="block text-starlight font-medium mb-2">
                شناسه پیگیری (اختیاری)
              </label>
              <input
                type="text"
                id="trackingId"
                value={formData.trackingId}
                onChange={(e) => setFormData({...formData, trackingId: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                placeholder="شناسه پیگیری تراکنش"
              />
            </div>

            {/* Last Four Digits */}
            <div>
              <label htmlFor="lastFourDigits" className="block text-starlight font-medium mb-2">
                ۴ رقم آخر کارت مبدا
              </label>
              <input
                type="text"
                id="lastFourDigits"
                value={formData.lastFourDigits}
                onChange={(e) => setFormData({...formData, lastFourDigits: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                placeholder="1234"
                maxLength={4}
                pattern="[0-9]{4}"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-starlight font-medium mb-2">
                مبلغ واریز (تومان)
              </label>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                placeholder="مبلغ واریز شده"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-starlight font-medium mb-2">
                توضیحات اضافی (اختیاری)
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                rows={3}
                placeholder="توضیحات اضافی در مورد واریز..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/dashboard/subscription')}
              >
                ← بازگشت
              </Button>
              
              <Button 
                type="submit" 
                variant="primary" 
                glow
                disabled={isSubmitting}
              >
                {isSubmitting ? 'در حال ارسال...' : '💳 ارسال درخواست پرداخت'}
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

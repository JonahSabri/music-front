'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
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
      loadTransactions();
    }
  }, [user, authLoading, router, mounted]);

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      // Load payments from backend
      const paymentsRes = await api.getPayments();
      const payments = (paymentsRes.data && !paymentsRes.error) ? paymentsRes.data : [];
      
      // Transform payments to transactions
      const paymentTransactions = payments.map((payment: any) => ({
        id: `payment_${payment.id}`,
        type: 'subscription',
        amount: payment.amount,
        status: payment.status === 'approved' ? 'completed' : payment.status === 'pending' ? 'pending' : 'failed',
        description: `خرید اشتراک ${payment.subscription_plan?.name_fa || 'نامشخص'}`,
        date: payment.transfer_date || payment.created_at,
        method: 'کارت به کارت',
        payment_id: payment.id
      }));

      // TODO: Add earnings and withdrawals when backend endpoints are ready
      const earnings = [];
      const withdrawals = [];

      setTransactions([...paymentTransactions, ...earnings, ...withdrawals]);
    } catch (error) {
      console.error('Error loading transactions:', error);
      // Fallback to empty array on error
      setTransactions([]);
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
            تاریخچه تراکنش‌ها
          </h1>
          <p className="text-muted">تمام پرداخت‌ها، درآمدها و برداشت‌های شما</p>
        </div>

        {/* Filter Options */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-starlight">فیلتر تراکنش‌ها</h2>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula">
                <option value="">همه انواع</option>
                <option value="subscription">اشتراک</option>
                <option value="earning">درآمد</option>
                <option value="withdrawal">برداشت</option>
              </select>
              <select className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula">
                <option value="">همه وضعیت‌ها</option>
                <option value="completed">تکمیل شده</option>
                <option value="pending">در انتظار</option>
                <option value="failed">ناموفق</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Transactions List */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">لیست تراکنش‌ها</h2>
          
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction: any) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                      transaction.type === 'subscription' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      transaction.type === 'earning' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      'bg-gradient-to-br from-yellow-400 to-yellow-600'
                    }`}>
                      {transaction.type === 'subscription' ? '💎' :
                       transaction.type === 'earning' ? '💰' : '💸'}
                    </div>
                    <div>
                      <div className="text-starlight font-bold">{transaction.description}</div>
                      <div className="text-muted text-sm">
                        {new Date(transaction.date).toLocaleDateString('fa-IR')} • {transaction.method}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status === 'completed' ? 'تکمیل شده' :
                       transaction.status === 'pending' ? 'در انتظار' : 'ناموفق'}
                    </div>
                    
                    <div className={`font-bold ${
                      transaction.type === 'earning' ? 'text-green-400' : 
                      transaction.type === 'withdrawal' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {transaction.type === 'earning' ? '+' : 
                       transaction.type === 'withdrawal' ? '-' : ''}
                      {transaction.amount.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-muted">هنوز تراکنشی ثبت نشده است</p>
            </div>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

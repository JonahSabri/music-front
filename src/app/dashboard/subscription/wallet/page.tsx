'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [shebaNumber, setShebaNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!user) {
      router.push('/login');
    } else {
      loadWalletData();
    }
  }, [user, router, mounted]);

  const loadWalletData = async () => {
    setIsLoading(true);
    try {
      // Mock wallet data for now - replace with actual API call
      setWalletData({
        balance: 0,
        totalEarnings: 0,
        pendingAmount: 0,
        transactions: [],
        withdrawalThreshold: 1000000 // 1M Toman
      });
      
      // Load user's wallet addresses
      setWalletAddress(user?.wallet_address || '');
      setShebaNumber(user?.sheba_number || '');
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveWalletAddresses = async () => {
    setIsSaving(true);
    try {
      // API call to save wallet addresses
      // await api.updateUserWallet({ wallet_address: walletAddress, sheba_number: shebaNumber });
      console.log('Saving wallet addresses:', { walletAddress, shebaNumber });
      // Show success message
    } catch (error) {
      console.error('Error saving wallet addresses:', error);
    } finally {
      setIsSaving(false);
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
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            کیف پول
          </h1>
          <p className="text-muted">مدیریت درآمد و برداشت از طریق TRC20</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Balance */}
          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted font-bold">موجودی کل</span>
              <div className="w-12 h-12 rounded-xl gradient-supernova flex items-center justify-center text-2xl glow-gold group-hover:rotate-12 transition-transform duration-300">
                💰
              </div>
            </div>
            <div className="text-3xl font-black text-gradient-nebula mb-2">
              {walletData?.balance?.toLocaleString('fa-IR') || '0'} تومان
            </div>
            <div className="text-muted text-sm">قابل برداشت</div>
          </GlassCard>

          {/* Total Earnings */}
          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted font-bold">کل درآمد</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                📈
              </div>
            </div>
            <div className="text-3xl font-black text-starlight mb-2">
              {walletData?.totalEarnings?.toLocaleString('fa-IR') || '0'} تومان
            </div>
            <div className="text-muted text-sm">از ابتدای فعالیت</div>
          </GlassCard>

          {/* Pending Amount */}
          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted font-bold">در انتظار</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                ⏳
              </div>
            </div>
            <div className="text-3xl font-black text-starlight mb-2">
              {walletData?.pendingAmount?.toLocaleString('fa-IR') || '0'} تومان
            </div>
            <div className="text-muted text-sm">در حال پردازش</div>
          </GlassCard>
        </div>

        {/* Wallet Addresses */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">آدرس‌های کیف پول</h2>
          
          {/* TRC20 Wallet */}
          <div className="mb-6">
            <label className="block text-starlight font-medium mb-2">
              آدرس کیف پول TRC20 (USDT)
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
              placeholder="TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE"
            />
            <p className="text-muted text-sm mt-2">
              آدرس کیف پول TRC20 خود را برای دریافت درآمد وارد کنید
            </p>
          </div>

          {/* Sheba Number */}
          <div className="mb-6">
            <label className="block text-starlight font-medium mb-2">
              شماره شبا بانک ایران
            </label>
            <input
              type="text"
              value={shebaNumber}
              onChange={(e) => setShebaNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
              placeholder="IR123456789012345678901234"
              maxLength={26}
            />
            <p className="text-muted text-sm mt-2">
              شماره شبا ۲۶ رقمی برای برداشت به حساب بانکی
            </p>
          </div>

          <Button 
            variant="primary" 
            onClick={saveWalletAddresses}
            disabled={isSaving}
            glow
          >
            {isSaving ? 'در حال ذخیره...' : '💾 ذخیره آدرس‌ها'}
          </Button>
        </GlassCard>

        {/* Withdrawal Section */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">درخواست برداشت</h2>
          
          {walletData?.balance >= walletData?.withdrawalThreshold ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400">
                  ✅ موجودی شما برای برداشت کافی است
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-starlight font-medium mb-2">
                    مبلغ برداشت (تومان)
                  </label>
                  <input
                    type="number"
                    max={walletData?.balance}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                    placeholder="مبلغ مورد نظر"
                  />
                </div>
                
                <div>
                  <label className="block text-starlight font-medium mb-3">
                    روش برداشت
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer">
                      <input type="radio" name="withdrawalMethod" value="trc20" defaultChecked className="ml-2" />
                      <div>
                        <div className="text-starlight font-medium">TRC20 (USDT)</div>
                        <div className="text-muted text-sm">آدرس: {walletAddress || 'وارد نشده'}</div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer">
                      <input type="radio" name="withdrawalMethod" value="sheba" className="ml-2" />
                      <div>
                        <div className="text-starlight font-medium">شماره شبا</div>
                        <div className="text-muted text-sm">شبا: {shebaNumber || 'وارد نشده'}</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <Button variant="primary" glow className="w-full">
                💸 درخواست برداشت
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400">
                ⚠️ موجودی شما برای برداشت کافی نیست. حداقل {walletData?.withdrawalThreshold?.toLocaleString('fa-IR')} تومان نیاز است.
              </p>
            </div>
          )}
        </GlassCard>

        {/* Transaction History */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">تاریخچه تراکنش‌ها</h2>
          
          {walletData?.transactions?.length > 0 ? (
            <div className="space-y-4">
              {walletData.transactions.map((transaction: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl">
                      {transaction.type === 'earning' ? '💰' : '💸'}
                    </div>
                    <div>
                      <div className="text-starlight font-bold">{transaction.description}</div>
                      <div className="text-muted text-sm">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'earning' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'earning' ? '+' : '-'}{transaction.amount.toLocaleString('fa-IR')} تومان
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

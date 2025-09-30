import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export default function WalletPage() {
  const earnings = [
    { track: 'سفر به ستاره‌ها', platform: 'Spotify', month: 'فروردین ۱۴۰۴', amount: '$45.23' },
    { track: 'ماه نو', platform: 'Apple Music', month: 'فروردین ۱۴۰۴', amount: '$32.50' },
    { track: 'سفر به ستاره‌ها', platform: 'YouTube Music', month: 'اسفند ۱۴۰۳', amount: '$18.75' },
    { track: 'ماه نو', platform: 'Amazon Music', month: 'اسفند ۱۴۰۳', amount: '$12.30' },
  ];

  return (
    <DashboardLayout>
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            کیف پول
          </h1>
          <p className="text-muted">
            مدیریت درآمد و تسویه حساب
          </p>
        </div>

        {/* Balance Card */}
        <GlassCard variant="hover-glow" className="gradient-cosmic p-8 mb-8" animated>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-muted mb-2">موجودی قابل برداشت</div>
              <div className="text-6xl font-bold text-starlight mb-4">$1,234.56</div>
              <Button variant="primary" glow className="bg-supernova hover:bg-supernova/90">
                💸 درخواست تسویه حساب
              </Button>
            </div>
            <div className="text-9xl opacity-20">💰</div>
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassCard variant="hover-glow" className="p-6" animated>
            <div className="text-muted mb-2">درآمد این ماه</div>
            <div className="text-3xl font-bold text-starlight">$234.50</div>
            <div className="text-green-400 text-sm mt-2">+12% نسبت به ماه قبل</div>
          </GlassCard>
          
          <GlassCard variant="hover-glow" className="p-6" animated>
            <div className="text-muted mb-2">کل درآمد</div>
            <div className="text-3xl font-bold text-starlight">$5,678.90</div>
            <div className="text-muted text-sm mt-2">از ابتدا تاکنون</div>
          </GlassCard>
          
          <GlassCard variant="hover-glow" className="p-6" animated>
            <div className="text-muted mb-2">آخرین برداشت</div>
            <div className="text-3xl font-bold text-starlight">$500.00</div>
            <div className="text-muted text-sm mt-2">۱۵ اسفند ۱۴۰۳</div>
          </GlassCard>
        </div>

        {/* Earnings Chart */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">نمودار درآمد ماهانه</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[120, 150, 90, 180, 210, 190, 234].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full gradient-nebula rounded-t-lg transition-all hover:opacity-80" 
                     style={{height: `${(value / 250) * 100}%`}}></div>
                <div className="text-muted text-xs mt-2">
                  {['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', 'فروردین'][index]}
                </div>
                <div className="text-starlight text-xs font-medium">${value}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Detailed Earnings Table */}
        <GlassCard variant="default" className="overflow-hidden" animated>
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-2xl font-bold text-starlight">جزئیات درآمدها</h2>
          </div>
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-right px-6 py-4 text-starlight font-medium">نام آهنگ</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">پلتفرم</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">ماه</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">مبلغ</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((earning, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-starlight font-medium">{earning.track}</td>
                  <td className="px-6 py-4 text-muted">{earning.platform}</td>
                  <td className="px-6 py-4 text-muted">{earning.month}</td>
                  <td className="px-6 py-4 text-supernova font-bold">{earning.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        {/* Payment Settings - TRC20 Wallet */}
        <GlassCard variant="default" className="mt-8 p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-4">تنظیمات پرداخت (Crypto - TRC20)</h2>
          <p className="text-muted mb-6">
            برای تسویه‌حساب دلاری، آدرس ولت USDT شبکه TRON (TRC20) خود را ثبت کنید. حتماً قبل از ثبت، آدرس را دوباره بررسی کنید.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-starlight font-medium mb-2">USDT (TRC20) Wallet Address</label>
              <input type="text" placeholder="Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-starlight font-medium mb-2">Full Name (Latin)</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50" />
              </div>
              <div>
                <label className="block text-starlight font-medium mb-2">Email for Payment Notices</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted text-sm">حداقل مبلغ برداشت: 50 USDT • کارمزد شبکه به عهده کاربر است</div>
              <Button variant="primary" glow className="px-6">💾 ذخیره تنظیمات</Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

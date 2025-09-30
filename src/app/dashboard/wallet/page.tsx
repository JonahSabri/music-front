import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';

export default function WalletPage() {
  const earnings = [
    { track: 'سفر به ستاره‌ها', platform: 'Spotify', month: 'فروردین ۱۴۰۴', amount: '$45.23' },
    { track: 'ماه نو', platform: 'Apple Music', month: 'فروردین ۱۴۰۴', amount: '$32.50' },
    { track: 'سفر به ستاره‌ها', platform: 'YouTube Music', month: 'اسفند ۱۴۰۳', amount: '$18.75' },
    { track: 'ماه نو', platform: 'Amazon Music', month: 'اسفند ۱۴۰۳', amount: '$12.30' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
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
        <div className="gradient-cosmic rounded-2xl p-8 mb-8 glow-purple border border-nebula/50">
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-muted mb-2">درآمد این ماه</div>
            <div className="text-3xl font-bold text-starlight">$234.50</div>
            <div className="text-green-400 text-sm mt-2">+12% نسبت به ماه قبل</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-muted mb-2">کل درآمد</div>
            <div className="text-3xl font-bold text-starlight">$5,678.90</div>
            <div className="text-muted text-sm mt-2">از ابتدا تاکنون</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-muted mb-2">آخرین برداشت</div>
            <div className="text-3xl font-bold text-starlight">$500.00</div>
            <div className="text-muted text-sm mt-2">۱۵ اسفند ۱۴۰۳</div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
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
        </div>

        {/* Detailed Earnings Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
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
        </div>

        {/* Payment Settings */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-2xl font-bold text-starlight mb-4">تنظیمات پرداخت</h2>
          <p className="text-muted mb-6">
            اطلاعات حساب بانکی یا PayPal خود را برای دریافت پرداخت‌ها وارد کنید
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">
              🏦 افزودن حساب بانکی
            </Button>
            <Button variant="outline">
              <svg className="w-5 h-5 inline ml-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.804.804 0 01-.793.68H7.76c-.414 0-.736-.336-.66-.748l1.575-9.98c.058-.368.374-.644.744-.644h5.106c3.238 0 5.774-1.314 6.514-5.12.256-1.313.192-2.447-.3-3.327a3.567 3.567 0 00-1.183-1.177c.472.714.68 1.613.496 2.68z"/>
              </svg>
              افزودن PayPal
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

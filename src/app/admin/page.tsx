import { AdminLayout } from '@/components/layout/AdminLayout';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            داشبورد مدیریت
          </h1>
          <p className="text-muted">
            نمای کلی از وضعیت پلتفرم
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-nebula transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">کل کاربران</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">1,234</div>
            <div className="flex items-center text-sm">
              <span className="text-green-400">+12%</span>
              <span className="text-muted mr-2">این ماه</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-nebula transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">آثار در صف بررسی</span>
              <span className="text-2xl">⏳</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">8</div>
            <Link href="/admin/releases" className="text-nebula text-sm hover:text-nebula-purple-light">
              مشاهده همه →
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-nebula transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">تیکت‌های باز</span>
              <span className="text-2xl">🎫</span>
            </div>
            <div className="text-3xl font-bold text-red-400 mb-2">15</div>
            <Link href="/admin/support" className="text-nebula text-sm hover:text-nebula-purple-light">
              پاسخگویی →
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-nebula transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">درآمد کل (ماه)</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-3xl font-bold text-supernova mb-2">$45,678</div>
            <div className="flex items-center text-sm">
              <span className="text-green-400">+8%</span>
              <span className="text-muted mr-2">نسبت به ماه قبل</span>
            </div>
          </div>
        </div>

        {/* Recent Users & Releases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Recent Users */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-starlight mb-6">آخرین کاربران ثبت‌نام شده</h2>
            <div className="space-y-3">
              {[
                { name: 'علی احمدی', email: 'ali@example.com', plan: 'Artist Plus', date: '۲ ساعت پیش' },
                { name: 'سارا کریمی', email: 'sara@example.com', plan: 'Artist', date: '۵ ساعت پیش' },
                { name: 'رضا محمدی', email: 'reza@example.com', plan: 'Label', date: '۱ روز پیش' },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full gradient-nebula flex items-center justify-center text-xl">
                      🎤
                    </div>
                    <div>
                      <div className="text-starlight font-medium">{user.name}</div>
                      <div className="text-muted text-sm">{user.email}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-supernova text-sm font-medium">{user.plan}</div>
                    <div className="text-muted text-xs">{user.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Releases */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-starlight mb-6">آثار در انتظار بررسی</h2>
            <div className="space-y-3">
              {[
                { title: 'سفر به ماه', artist: 'علی احمدی', type: 'Single', date: '۱ ساعت پیش' },
                { title: 'کهکشان آبی', artist: 'سارا کریمی', type: 'Album', date: '۳ ساعت پیش' },
                { title: 'ستاره‌های شب', artist: 'رضا محمدی', type: 'EP', date: '۵ ساعت پیش' },
              ].map((release, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg gradient-supernova flex items-center justify-center text-xl">
                      🎵
                    </div>
                    <div>
                      <div className="text-starlight font-medium">{release.title}</div>
                      <div className="text-muted text-sm">{release.artist} • {release.type}</div>
                    </div>
                  </div>
                  <div className="text-muted text-xs">{release.date}</div>
                </div>
              ))}
            </div>
            <Link href="/admin/releases" className="block mt-4 text-center text-nebula hover:text-nebula-purple-light">
              مشاهده همه →
            </Link>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-2xl font-bold text-starlight mb-6">آمار پلتفرم</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🎵</div>
              <div className="text-3xl font-bold text-starlight mb-1">3,456</div>
              <div className="text-muted text-sm">کل آثار منتشر شده</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎧</div>
              <div className="text-3xl font-bold text-starlight mb-1">2.4M</div>
              <div className="text-muted text-sm">کل استریم‌ها</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💵</div>
              <div className="text-3xl font-bold text-starlight mb-1">$156K</div>
              <div className="text-muted text-sm">کل پرداخت‌ها</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-starlight mb-1">4.8</div>
              <div className="text-muted text-sm">رضایت کاربران</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

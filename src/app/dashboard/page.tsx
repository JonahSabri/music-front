import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <AnimatedBackground />
      {/* Welcome Section */}
      <div className="mb-8 relative z-10 animate-slide-up">
        <h1 className="text-5xl font-black text-starlight mb-2" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 40px rgba(123, 44, 191, 0.5)'}}>
          سلام علی، به استودیوی فضایی خود خوش آمدید! 🚀
        </h1>
        <p className="text-muted text-xl">
          آماده برای پرتاب موسیقی جدید به کهکشان؟
        </p>
      </div>

      {/* Main CTA */}
      <Link href="/dashboard/upload" className="block mb-8 relative z-10">
        <GlassCard variant="hover-glow" className="gradient-cosmic p-8 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-nebula/20 to-supernova/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-3xl font-black text-starlight mb-2 group-hover:text-gradient-nebula transition-all">آپلود موسیقی جدید</h2>
              <p className="text-muted text-lg">آهنگ یا آلبوم خود را به بیش از ۱۵۰ پلتفرم ارسال کنید</p>
            </div>
            <div className="w-20 h-20 rounded-full gradient-supernova flex items-center justify-center text-5xl glow-gold group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              🚀
            </div>
          </div>
        </GlassCard>
      </Link>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
        {/* Balance */}
        <GlassCard variant="hover-glow" className="p-6 group" animated>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted font-bold">موجودی کیف پول</span>
            <div className="w-12 h-12 rounded-xl gradient-supernova flex items-center justify-center text-2xl glow-gold group-hover:rotate-12 transition-transform duration-300">
              💰
            </div>
          </div>
          <div className="text-4xl font-black text-gradient-nebula mb-2">۱۲,۳۴۵,۶۰۰ تومان</div>
          <Link href="/dashboard/wallet" className="text-nebula text-sm hover:text-supernova transition-colors font-bold">
            مشاهده جزئیات ←
          </Link>
        </GlassCard>

        {/* Total Streams */}
        <GlassCard variant="hover-glow" className="p-6 group" animated>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted font-bold">مجموع پخش (ماه اخیر)</span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              📈
            </div>
          </div>
          <div className="text-4xl font-black text-starlight mb-2">45,892</div>
          <div className="flex items-center text-sm">
            <span className="text-green-400 font-bold">+23%</span>
            <span className="text-muted mr-2">نسبت به ماه قبل</span>
          </div>
        </GlassCard>

        {/* Top Track */}
        <GlassCard variant="hover-glow" className="p-6 group" animated>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted font-bold">پربازدیدترین آهنگ</span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              ⭐
            </div>
          </div>
          <div className="text-xl font-bold text-starlight mb-1">سفر به ستاره‌ها</div>
          <div className="text-muted text-sm">12,456 پخش</div>
        </GlassCard>
      </div>

      {/* Recent Releases */}
      <GlassCard variant="default" className="p-6 mb-8 relative z-10" animated>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-starlight">آخرین آثار منتشر شده</h2>
          <Link href="/dashboard/music" className="text-nebula hover:text-nebula-purple-light">
            مشاهده همه ←
          </Link>
        </div>

        <div className="space-y-4">
          {[
            { 
              title: 'سفر به ستاره‌ها', 
              type: 'تک‌آهنگ', 
              date: '۱۵ فروردین ۱۴۰۴', 
              status: 'منتشر شده',
              statusColor: 'text-green-400',
              cover: '🎵'
            },
            { 
              title: 'کهکشان من', 
              type: 'آلبوم', 
              date: '۱ فروردین ۱۴۰۴', 
              status: 'در حال بررسی',
              statusColor: 'text-yellow-400',
              cover: '🎶'
            },
            { 
              title: 'ماه نو', 
              type: 'تک‌آهنگ', 
              date: '۲۵ اسفند ۱۴۰۳', 
              status: 'منتشر شده',
              statusColor: 'text-green-400',
              cover: '🎤'
            }
          ].map((release, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-lg gradient-nebula flex items-center justify-center text-2xl">
                  {release.cover}
                </div>
                <div>
                  <div className="text-starlight font-bold">{release.title}</div>
                  <div className="text-muted text-sm">{release.type} • {release.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${release.statusColor}`}>
                  {release.status}
                </span>
                <button className="text-muted hover:text-starlight">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard variant="default" className="p-6 relative z-10" animated>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-starlight">اعلان‌ها</h2>
          <button className="text-nebula hover:text-nebula-purple-light text-sm">
            علامت خواندن همه
          </button>
        </div>

        <div className="space-y-3">
          {[
            { 
              icon: '✅', 
              title: 'آلبوم تایید شد', 
              message: 'آلبوم "کهکشان من" تایید شد و به زودی منتشر می‌شود',
              time: '۲ ساعت پیش'
            },
            { 
              icon: '💰', 
              title: 'درآمد جدید', 
              message: 'مبلغ $45.23 به کیف پول شما اضافه شد',
              time: '۵ ساعت پیش'
            },
            { 
              icon: '📊', 
              title: 'آمار ماهانه', 
              message: 'گزارش آماری ماه گذشته آماده است',
              time: '۱ روز پیش'
            }
          ].map((notification, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-2xl">{notification.icon}</span>
              <div className="flex-1">
                <div className="text-starlight font-medium">{notification.title}</div>
                <div className="text-muted text-sm">{notification.message}</div>
              </div>
              <span className="text-muted text-xs whitespace-nowrap">{notification.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardLayout>
  );
}

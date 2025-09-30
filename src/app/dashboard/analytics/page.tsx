import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            آمار و تحلیل
          </h1>
          <p className="text-muted">
            تحلیل عملکرد موسیقی شما در پلتفرم‌های مختلف
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            هفته اخیر
          </button>
          <button className="px-4 py-2 rounded-lg bg-nebula text-white font-medium">
            ماه اخیر
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            ۳ ماه اخیر
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            کل
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">مجموع پخش</span>
              <span className="text-2xl">🎧</span>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">45,892</div>
            <div className="flex items-center text-sm">
              <span className="text-green-400">+23%</span>
              <span className="text-muted mr-2">نسبت به ماه قبل</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">شنوندگان منحصر</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">12,456</div>
            <div className="flex items-center text-sm">
              <span className="text-green-400">+18%</span>
              <span className="text-muted mr-2">نسبت به ماه قبل</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">ذخیره در پلی‌لیست</span>
              <span className="text-2xl">💾</span>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">2,345</div>
            <div className="flex items-center text-sm">
              <span className="text-green-400">+31%</span>
              <span className="text-muted mr-2">نسبت به ماه قبل</span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">میانگین زمان پخش</span>
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">2:45</div>
            <div className="flex items-center text-sm">
              <span className="text-green-400">+5%</span>
              <span className="text-muted mr-2">نسبت به ماه قبل</span>
            </div>
          </div>
        </div>

        {/* Streams Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
          <h2 className="text-2xl font-bold text-starlight mb-6">پخش روزانه</h2>
          <div className="h-64 flex items-end justify-between space-x-1">
            {[1200, 1500, 1100, 1800, 2100, 1900, 2200, 2400, 2000, 2300, 2600, 2800, 2500, 2700, 3000].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="w-full gradient-nebula rounded-t-lg transition-all hover:opacity-80 cursor-pointer" 
                     style={{height: `${(value / 3000) * 100}%`}}>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white text-center pt-1">
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-muted text-xs">
            <span>۱ فروردین</span>
            <span>۱۵ فروردین</span>
          </div>
        </div>

        {/* Platform Distribution & Top Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Platforms */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-starlight mb-6">پلتفرم‌های برتر</h2>
            <div className="space-y-4">
              {[
                { name: 'Spotify', percentage: 60, color: 'bg-green-500' },
                { name: 'Apple Music', percentage: 25, color: 'bg-pink-500' },
                { name: 'YouTube Music', percentage: 10, color: 'bg-red-500' },
                { name: 'Amazon Music', percentage: 5, color: 'bg-blue-500' },
              ].map((platform) => (
                <div key={platform.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-starlight font-medium">{platform.name}</span>
                    <span className="text-muted">{platform.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className={`${platform.color} h-2 rounded-full transition-all duration-500`} 
                         style={{width: `${platform.percentage}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Tracks */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-starlight mb-6">آهنگ‌های برتر</h2>
            <div className="space-y-4">
              {[
                { rank: 1, title: 'سفر به ستاره‌ها', streams: '12,456', cover: '🎵' },
                { rank: 2, title: 'ماه نو', streams: '8,234', cover: '🎤' },
                { rank: 3, title: 'کهکشان من', streams: '6,789', cover: '🎶' },
                { rank: 4, title: 'شب‌های بی‌ستاره', streams: '5,432', cover: '🎸' },
              ].map((track) => (
                <div key={track.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full gradient-supernova flex items-center justify-center text-deep-space font-bold text-sm">
                      {track.rank}
                    </div>
                    <div className="w-10 h-10 rounded-lg gradient-nebula flex items-center justify-center text-xl">
                      {track.cover}
                    </div>
                    <span className="text-starlight font-medium">{track.title}</span>
                  </div>
                  <span className="text-muted">{track.streams}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-2xl font-bold text-starlight mb-6">موقعیت جغرافیایی شنوندگان</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { country: 'ایران', flag: '🇮🇷', percentage: '45%' },
              { country: 'آمریکا', flag: '🇺🇸', percentage: '20%' },
              { country: 'آلمان', flag: '🇩🇪', percentage: '15%' },
              { country: 'انگلستان', flag: '🇬🇧', percentage: '10%' },
              { country: 'کانادا', flag: '🇨🇦', percentage: '5%' },
              { country: 'استرالیا', flag: '🇦🇺', percentage: '3%' },
              { country: 'فرانسه', flag: '🇫🇷', percentage: '1%' },
              { country: 'سایر', flag: '🌍', percentage: '1%' },
            ].map((location) => (
              <div key={location.country} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-2">{location.flag}</div>
                <div className="text-starlight font-medium mb-1">{location.country}</div>
                <div className="text-nebula font-bold">{location.percentage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

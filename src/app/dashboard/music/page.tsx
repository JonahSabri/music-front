import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function MyMusicPage() {
  const releases = [
    { 
      id: 1,
      cover: '🎵',
      title: 'سفر به ستاره‌ها',
      type: 'تک‌آهنگ',
      releaseDate: '۱۵ فروردین ۱۴۰۴',
      status: 'Live',
      statusColor: 'bg-green-500',
      streams: '12,456'
    },
    { 
      id: 2,
      cover: '🎶',
      title: 'کهکشان من',
      type: 'آلبوم',
      releaseDate: '۱ فروردین ۱۴۰۴',
      status: 'In Review',
      statusColor: 'bg-yellow-500',
      streams: '-'
    },
    { 
      id: 3,
      cover: '🎤',
      title: 'ماه نو',
      type: 'تک‌آهنگ',
      releaseDate: '۲۵ اسفند ۱۴۰۳',
      status: 'Live',
      statusColor: 'bg-green-500',
      streams: '8,234'
    },
    { 
      id: 4,
      cover: '🎸',
      title: 'شب‌های بی‌ستاره',
      type: 'EP',
      releaseDate: '۱۰ اسفند ۱۴۰۳',
      status: 'Needs Action',
      statusColor: 'bg-red-500',
      streams: '-'
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
              موسیقی من
            </h1>
            <p className="text-muted">
              مدیریت و پیگیری تمام آثار منتشر شده
            </p>
          </div>
          <Link href="/dashboard/upload">
            <Button variant="primary" glow>
              + آپلود جدید
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <button className="px-4 py-2 rounded-lg bg-nebula text-white font-medium">
            همه
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            منتشر شده
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            در حال بررسی
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            نیاز به اقدام
          </button>
        </div>

        {/* Releases Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-right px-6 py-4 text-starlight font-medium">اثر</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">نوع</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">تاریخ انتشار</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">وضعیت</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">استریم</th>
                <th className="text-right px-6 py-4 text-starlight font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {releases.map((release) => (
                <tr key={release.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg gradient-nebula flex items-center justify-center text-2xl">
                        {release.cover}
                      </div>
                      <span className="text-starlight font-medium">{release.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{release.type}</td>
                  <td className="px-6 py-4 text-muted">{release.releaseDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${release.statusColor}`}>
                      {release.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-starlight font-medium">{release.streams}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="مشاهده آمار">
                        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="لینک‌های هوشمند">
                        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-red-400" title="حذف">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/ui/Notification';

export default function AnalyticsPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const { addNotification } = useNotification();
  const [analytics, setAnalytics] = useState<any>(null);
  const [previousAnalytics, setPreviousAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [timeFilter, setTimeFilter] = useState('month');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadAnalytics();
    }
  }, [user, authLoading, router, mounted]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const analyticsRes = await api.getAnalyticsSummary();
      if (analyticsRes.data && !analyticsRes.error) {
        // Store previous analytics for comparison
        if (analytics) {
          setPreviousAnalytics(analytics);
        }
        setAnalytics(analyticsRes.data);
      } else {
        setAnalytics(null);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      addNotification({
        type: 'error',
        title: 'خطا در بارگذاری',
        message: 'خطا در بارگذاری آمار و تحلیل'
      });
      setAnalytics(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate percentage change
  const calculatePercentageChange = (current: number, previous: number) => {
    if (!previous || previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
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
      <div className="max-w-7xl mx-auto p-6 relative z-10">
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
        <GlassCard variant="default" className="p-4 mb-8" animated>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'week' 
                  ? 'bg-nebula text-white font-medium' 
                  : 'bg-white/10 text-muted hover:bg-white/20'
              }`}
            >
              هفته اخیر
            </button>
            <button 
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'month' 
                  ? 'bg-nebula text-white font-medium' 
                  : 'bg-white/10 text-muted hover:bg-white/20'
              }`}
            >
              ماه اخیر
            </button>
            <button 
              onClick={() => setTimeFilter('quarter')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'quarter' 
                  ? 'bg-nebula text-white font-medium' 
                  : 'bg-white/10 text-muted hover:bg-white/20'
              }`}
            >
              ۳ ماه اخیر
            </button>
            <button 
              onClick={() => setTimeFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'all' 
                  ? 'bg-nebula text-white font-medium' 
                  : 'bg-white/10 text-muted hover:bg-white/20'
              }`}
            >
              کل
            </button>
          </div>
        </GlassCard>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">مجموع پخش</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">
              {analytics?.total_streams?.toLocaleString('fa-IR') || '0'}
            </div>
            <div className="flex items-center text-sm">
              {(() => {
                const change = calculatePercentageChange(
                  analytics?.total_streams || 0,
                  previousAnalytics?.total_streams || 0
                );
                return (
                  <>
                    <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {change >= 0 ? '+' : ''}{change}%
                    </span>
                    <span className="text-muted mr-2">نسبت به ماه قبل</span>
                  </>
                );
              })()}
            </div>
          </GlassCard>

          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">شنوندگان منحصر</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">
              {analytics?.total_unique_listeners?.toLocaleString('fa-IR') || '0'}
            </div>
            <div className="flex items-center text-sm">
              {(() => {
                const change = calculatePercentageChange(
                  analytics?.total_unique_listeners || 0,
                  previousAnalytics?.total_unique_listeners || 0
                );
                return (
                  <>
                    <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {change >= 0 ? '+' : ''}{change}%
                    </span>
                    <span className="text-muted mr-2">نسبت به ماه قبل</span>
                  </>
                );
              })()}
            </div>
          </GlassCard>

          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">ذخیره در پلی‌لیست</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">
              {analytics?.total_playlist_saves?.toLocaleString('fa-IR') || '0'}
            </div>
            <div className="flex items-center text-sm">
              {(() => {
                const change = calculatePercentageChange(
                  analytics?.total_playlist_saves || 0,
                  previousAnalytics?.total_playlist_saves || 0
                );
                return (
                  <>
                    <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {change >= 0 ? '+' : ''}{change}%
                    </span>
                    <span className="text-muted mr-2">نسبت به ماه قبل</span>
                  </>
                );
              })()}
            </div>
          </GlassCard>

          <GlassCard variant="hover-glow" className="p-6 group" animated>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted">میانگین زمان پخش</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-starlight mb-2">
              {analytics?.average_listen_duration ? 
                new Date(analytics.average_listen_duration).toLocaleTimeString('fa-IR', { 
                  minute: '2-digit', 
                  second: '2-digit' 
                }) : '0:00'}
            </div>
            <div className="flex items-center text-sm">
              {(() => {
                const change = calculatePercentageChange(
                  analytics?.average_listen_duration || 0,
                  previousAnalytics?.average_listen_duration || 0
                );
                return (
                  <>
                    <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {change >= 0 ? '+' : ''}{change}%
                    </span>
                    <span className="text-muted mr-2">نسبت به ماه قبل</span>
                  </>
                );
              })()}
            </div>
          </GlassCard>
        </div>

        {/* Streams Chart */}
        <GlassCard variant="default" className="p-6 mb-8" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">پخش روزانه</h2>
          <div className="h-64 flex items-end justify-between space-x-1">
            {analytics?.daily_streams?.length > 0 ? (
              analytics.daily_streams.map((day: any, index: number) => {
                const maxStreams = Math.max(...analytics.daily_streams.map((d: any) => d.streams));
                const height = maxStreams > 0 ? (day.streams / maxStreams) * 100 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div 
                      className="w-full gradient-nebula rounded-t-lg transition-all hover:opacity-80 cursor-pointer" 
                      style={{height: `${height}%`}}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white text-center pt-1">
                        {day.streams}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p>آمار پخش روزانه موجود نیست</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4 text-muted text-xs">
            <span>۳۰ روز گذشته</span>
            <span>امروز</span>
          </div>
        </GlassCard>

        {/* Platform Distribution & Top Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Platforms */}
          <GlassCard variant="default" className="p-6" animated>
            <h2 className="text-2xl font-bold text-starlight mb-6">پلتفرم‌های برتر</h2>
            <div className="space-y-4">
              {analytics?.platform_distribution ? (
                Object.entries(analytics.platform_distribution).map(([platform, streams]: [string, any]) => {
                  const totalStreams = Object.values(analytics.platform_distribution).reduce((sum: number, val: any) => sum + val, 0);
                  const percentage = totalStreams > 0 ? Math.round((streams / totalStreams) * 100) : 0;
                  const colors = {
                    spotify: 'bg-green-500',
                    apple_music: 'bg-pink-500',
                    youtube_music: 'bg-red-500',
                    amazon_music: 'bg-blue-500',
                    other_platforms: 'bg-gray-500'
                  };
                  const names = {
                    spotify: 'Spotify',
                    apple_music: 'Apple Music',
                    youtube_music: 'YouTube Music',
                    amazon_music: 'Amazon Music',
                    other_platforms: 'سایر پلتفرم‌ها'
                  };
                  
                  return (
                    <div key={platform}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-starlight font-medium">{names[platform as keyof typeof names]}</span>
                        <span className="text-muted">{percentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className={`${colors[platform as keyof typeof colors]} h-2 rounded-full transition-all duration-500`} 
                          style={{width: `${percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-muted">آمار پلتفرم‌ها موجود نیست</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Top Tracks */}
          <GlassCard variant="default" className="p-6" animated>
            <h2 className="text-2xl font-bold text-starlight mb-6">آهنگ‌های برتر</h2>
            <div className="space-y-4">
              {analytics?.top_tracks?.length > 0 ? (
                analytics.top_tracks.map((track: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full gradient-supernova flex items-center justify-center text-deep-space font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-lg gradient-nebula flex items-center justify-center text-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <span className="text-starlight font-medium">{track.track__title}</span>
                    </div>
                    <span className="text-muted">{track.total_streams?.toLocaleString('fa-IR') || '0'}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎵</div>
                  <p className="text-muted">آهنگ‌های برتر موجود نیست</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Geographic Distribution */}
        <GlassCard variant="default" className="p-6" animated>
          <h2 className="text-2xl font-bold text-starlight mb-6">موقعیت جغرافیایی شنوندگان</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {analytics?.geographic_distribution ? (
              Object.entries(analytics.geographic_distribution).map(([country, listeners]: [string, any]) => {
                const totalListeners = Object.values(analytics.geographic_distribution).reduce((sum: number, val: any) => sum + val, 0);
                const percentage = totalListeners > 0 ? Math.round((listeners / totalListeners) * 100) : 0;
                
                const countryData = {
                  iran: { name: 'ایران', flag: '🇮🇷' },
                  usa: { name: 'آمریکا', flag: '🇺🇸' },
                  germany: { name: 'آلمان', flag: '🇩🇪' },
                  uk: { name: 'انگلستان', flag: '🇬🇧' },
                  canada: { name: 'کانادا', flag: '🇨🇦' },
                  australia: { name: 'استرالیا', flag: '🇦🇺' },
                  france: { name: 'فرانسه', flag: '🇫🇷' },
                  other_countries: { name: 'سایر', flag: '🌍' }
                };
                
                const data = countryData[country as keyof typeof countryData];
                if (!data) return null;
                
                return (
                  <div key={country} className="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors">
                    <div className="text-4xl mb-2">{data.flag}</div>
                    <div className="text-starlight font-medium mb-1">{data.name}</div>
                    <div className="text-nebula font-bold">{percentage}%</div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <div className="text-4xl mb-2">🌍</div>
                <p className="text-muted">آمار جغرافیایی موجود نیست</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

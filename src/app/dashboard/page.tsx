'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/ui/Notification';

export default function DashboardPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const { addNotification } = useNotification();
  const [tracks, setTracks] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Wait for auth to finish loading
    if (authLoading) return;
    
    if (!user) {
      router.push('/login');
    } else {
      loadDashboardData();
    }
  }, [user, authLoading, router, mounted]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [tracksRes, subRes, notificationsRes] = await Promise.all([
        api.getTracks(),
        api.getCurrentSubscription(),
        api.getNotifications()
      ]);

      if (tracksRes.data && !tracksRes.error) {
        const tracksData = (tracksRes.data as any).results || tracksRes.data;
        setTracks(Array.isArray(tracksData) ? tracksData : []);
      } else {
        setTracks([]);
      }
      
      if (subRes.data && !subRes.error) {
        setSubscription(subRes.data);
      } else {
        setSubscription(null);
      }
      
      if (notificationsRes.data && !notificationsRes.error) {
        setNotifications((notificationsRes.data as any).results || notificationsRes.data || []);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Show error notification
      addNotification({
        type: 'error',
        title: 'خطا در بارگذاری',
        message: 'خطا در بارگذاری اطلاعات داشبورد'
      });
      // Set empty data on error
      setTracks([]);
      setSubscription(null);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebula mx-auto mb-4"></div>
            <div className="text-starlight text-xl">در حال بارگذاری...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebula mx-auto mb-4"></div>
            <div className="text-starlight text-xl">در حال بارگذاری اطلاعات...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const recentTracks = Array.isArray(tracks) ? tracks.slice(0, 3) : [];

  return (
    <DashboardLayout>
      <AnimatedBackground />
      <div className="p-6">
      {/* Welcome Section */}
      <GlassCard variant="hover-glow" className="mb-8 relative z-10 animate-slide-up" animated>
        {/* Animated Music Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 right-8 text-nebula/20 text-2xl animate-float">♪</div>
          <div className="absolute top-8 left-12 text-supernova/25 text-xl animate-float" style={{animationDelay: '1s'}}>♫</div>
          <div className="absolute bottom-4 right-16 text-white/15 text-lg animate-float" style={{animationDelay: '2s'}}>♬</div>
        </div>
        
        <div className="relative z-10 p-6">
          <h1 className="text-3xl md:text-4xl font-black text-starlight mb-2" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 40px rgba(123, 44, 191, 0.5)'}}>
            {user?.artist_name || user?.username} به استدیو فضایی خوشومدی!
          </h1>
          <p className="text-muted text-lg mb-6">
            آماده برای پرتاب موسیقی جدید به کهکشان؟
          </p>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>آنلاین</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-4 h-4 text-nebula" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,3V13.55C11.41,13.21 10.73,13 10,13A4,4 0 0,0 6,17A4,4 0 0,0 10,21A4,4 0 0,0 14,17V7H18V3H12Z"/>
              </svg>
              <span>{tracks.length} ترک منتشر شده</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-4 h-4 text-supernova" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
              </svg>
              <span>{subscription?.has_subscription ? 'حرفه‌ای' : 'رایگان'}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Main CTA */}
      <Link href="/dashboard/upload" className="block mb-8 relative z-10">
        <GlassCard variant="hover-glow" className="gradient-cosmic p-8 group relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-nebula/20 to-supernova/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          
          {/* Sound Wave Animation */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nebula/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="h-full bg-gradient-to-r from-nebula to-supernova animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-3xl font-black text-starlight mb-2 group-hover:text-gradient-nebula transition-all">آپلود موسیقی جدید</h2>
              <p className="text-muted text-lg">آهنگ یا آلبوم خود را به بیش از ۱۵۰ پلتفرم ارسال کنید</p>
              
              {/* Quick Upload Stats */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm text-muted">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>آماده انتشار</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <span>در حال بررسی</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted">
                  <div className="w-1 h-1 bg-nebula rounded-full"></div>
                  <span>منتشر شده</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-20 h-20 rounded-full gradient-supernova flex items-center justify-center text-5xl glow-gold group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border border-white/10 animate-ping" style={{animationDelay: '0.5s'}}></div>
                
                <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              
              {/* Floating Music Notes */}
              <div className="absolute -top-2 -right-2 text-nebula/60 text-lg animate-float">♪</div>
              <div className="absolute -bottom-1 -left-1 text-supernova/60 text-sm animate-float" style={{animationDelay: '1s'}}>♫</div>
            </div>
          </div>
        </GlassCard>
      </Link>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
        {/* Subscription Status */}
        <GlassCard variant="hover-glow" className="p-6 group relative overflow-hidden" animated>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-8 h-8 border border-nebula/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-supernova/20 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-muted font-bold">وضعیت اشتراک</span>
            <div className="w-12 h-12 rounded-xl gradient-supernova flex items-center justify-center text-2xl glow-gold group-hover:rotate-12 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="text-2xl font-black text-gradient-nebula mb-2">
              {subscription?.has_subscription ? subscription.plan.name : 'رایگان'}
            </div>
            <p className="text-muted text-sm mb-3">
              {subscription?.has_subscription 
                ? `تا ${new Date(subscription.end_date).toLocaleDateString('fa-IR')}`
                : 'یک ترک رایگان'
              }
            </p>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className={`h-2 rounded-full bg-gradient-to-r ${subscription?.has_subscription ? 'from-nebula to-supernova' : 'from-gray-500 to-gray-600'} transition-all duration-500`} 
                     style={{width: subscription?.has_subscription ? '100%' : '33%'}}></div>
              </div>
            </div>
            
            <Link href="/dashboard/subscription" className="text-nebula text-sm hover:text-supernova transition-colors font-bold">
              {subscription?.has_subscription ? 'مشاهده جزئیات' : 'ارتقا به حرفه‌ای'} ←
            </Link>
          </div>
        </GlassCard>

        {/* Total Tracks */}
        <GlassCard variant="hover-glow" className="p-6 group relative overflow-hidden" animated>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-6 h-6 border border-green-400/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-green-400/20 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-muted font-bold">تعداد ترک‌ها</span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="text-4xl font-black text-starlight mb-2">{tracks.length}</div>
            <div className="flex items-center text-sm mb-3">
              <span className="text-muted">
                {subscription?.has_subscription ? 'نامحدود' : `${Math.max(0, 1 - tracks.length)} ترک رایگان باقی‌مانده`}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500" 
                     style={{width: subscription?.has_subscription ? '100%' : `${(tracks.length / 1) * 100}%`}}></div>
              </div>
            </div>
            
            {/* Music Note Animation */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1 bg-green-400/30 rounded-full animate-pulse" 
                     style={{height: `${i * 4}px`, animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Upload Status */}
        <GlassCard variant="hover-glow" className="p-6 group relative overflow-hidden" animated>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-6 h-6 border border-yellow-400/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400/20 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-muted font-bold">وضعیت آپلود</span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="text-xl font-bold text-starlight mb-1">
              {user?.can_upload?.allowed ? 'آماده آپلود' : 'نیاز به اشتراک'}
            </div>
            <p className="text-muted text-sm mb-3">{user?.can_upload?.message}</p>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${user?.can_upload?.allowed ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
              <span className="text-xs text-muted">
                {user?.can_upload?.allowed ? 'فعال' : 'غیرفعال'}
              </span>
            </div>
            
            {/* Upload Progress Simulation */}
            <div className="w-full bg-white/10 rounded-full h-1">
              <div className={`h-1 rounded-full bg-gradient-to-r ${user?.can_upload?.allowed ? 'from-green-400 to-green-600' : 'from-yellow-400 to-yellow-600'} transition-all duration-500`} 
                   style={{width: user?.can_upload?.allowed ? '100%' : '60%'}}></div>
            </div>
          </div>
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
          {recentTracks.length > 0 ? (
            recentTracks.map((track: any) => (
              <div key={track.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-lg gradient-nebula flex items-center justify-center text-2xl overflow-hidden">
                    {track.cover_art ? (
                      <img src={track.cover_art} alt={track.title} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-starlight font-bold">{track.title}</div>
                    <div className="text-muted text-sm">{track.release_type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${
                    track.status === 'published' ? 'text-green-400' :
                    track.status === 'approved' ? 'text-blue-400' :
                    track.status === 'pending' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {track.status_display}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-nebula flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <p className="text-muted">هنوز ترکی آپلود نکرده‌اید</p>
              <Link href="/dashboard/upload" className="text-nebula hover:text-supernova mt-2 inline-block">
                اولین ترک خود را آپلود کنید →
              </Link>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard variant="default" className="p-6 relative z-10" animated>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-starlight">اعلان‌ها</h2>
          <button 
            className="text-nebula hover:text-nebula-purple-light text-sm"
            onClick={async () => {
              try {
                await api.markAllNotificationsAsRead();
                setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
                addNotification({
                  type: 'success',
                  title: 'موفق',
                  message: 'همه اعلان‌ها به عنوان خوانده شده علامت‌گذاری شدند'
                });
              } catch (error) {
                addNotification({
                  type: 'error',
                  title: 'خطا',
                  message: 'خطا در علامت‌گذاری اعلان‌ها'
                });
              }
            }}
          >
            علامت خواندن همه
          </button>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification: any) => (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors ${
                  !notification.is_read ? 'bg-blue-500/5 border-r-4 border-blue-500' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  {notification.type === 'track_approved' ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : notification.type === 'track_rejected' ? (
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : notification.type === 'payment_approved' ? (
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  ) : notification.type === 'earning' ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-starlight font-medium">{notification.title}</div>
                  <div className="text-muted text-sm">{notification.message}</div>
                </div>
                <span className="text-muted text-xs whitespace-nowrap">
                  {new Date(notification.created_at).toLocaleDateString('fa-IR')}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                </svg>
              </div>
              <p className="text-muted">هیچ اعلان جدیدی وجود ندارد</p>
            </div>
          )}
        </div>
      </GlassCard>
      </div>
    </DashboardLayout>
  );
}

'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { MusicCard } from '@/components/ui/MusicCard';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MusicPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [tracks, setTracks] = useState<any[]>([]);
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
      loadTracks();
    }
  }, [user, authLoading, router, mounted]);

  const loadTracks = async () => {
    setIsLoading(true);
    try {
      const response = await api.getTracks();
      if (response.data) {
        const tracksData = (response.data as any)?.results || response.data;
        setTracks(Array.isArray(tracksData) ? tracksData : []);
      }
    } catch (error) {
      console.error('Error loading tracks:', error);
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
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 relative">
          {/* Animated Music Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-2 right-8 text-nebula/20 text-xl animate-float">♪</div>
            <div className="absolute top-6 left-12 text-supernova/25 text-lg animate-float" style={{animationDelay: '1s'}}>♫</div>
            <div className="absolute bottom-2 right-16 text-white/15 text-sm animate-float" style={{animationDelay: '2s'}}>♬</div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
              موسیقی من
            </h1>
            <p className="text-muted">مدیریت و مشاهده تمام ترک‌های آپلود شده</p>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{tracks.length} ترک</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <svg className="w-4 h-4 text-nebula" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3V13.55C11.41,13.21 10.73,13 10,13A4,4 0 0,0 6,17A4,4 0 0,0 10,21A4,4 0 0,0 14,17V7H18V3H12Z"/>
                </svg>
                <span>آماده پخش</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upload CTA */}
        <Link href="/dashboard/upload" className="block mb-8">
          <GlassCard variant="hover-glow" className="gradient-cosmic p-6 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-nebula/20 to-supernova/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-starlight mb-2 group-hover:text-gradient-nebula transition-all">آپلود ترک جدید</h2>
                <p className="text-muted">آهنگ یا آلبوم خود را به بیش از ۱۵۰ پلتفرم ارسال کنید</p>
              </div>
              <div className="w-16 h-16 rounded-full gradient-supernova flex items-center justify-center text-3xl glow-gold group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                🚀
              </div>
            </div>
          </GlassCard>
        </Link>

        {/* Tracks Grid */}
        {tracks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tracks.map((track: any) => (
              <div key={track.id} className="relative group">
                <MusicCard
                  track={{
                    id: track.id,
                    title: track.title,
                    artist_name: track.artist_name,
                    cover_image: track.cover_art,
                    audio_file: track.audio_file,
                    status: track.status,
                    created_at: track.created_at,
                    streams: track.streams,
                    duration: track.duration
                  }}
                  variant="default"
                  showVisualizer={false}
                  onPlay={(track) => console.log('Playing:', track.title)}
                  onPause={(track) => console.log('Paused:', track.title)}
                />
                
                {/* Settings Button - Bottom of card */}
                <div className="mt-3">
                  <button
                    onClick={() => router.push(`/dashboard/music/${track.id}`)}
                    className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-nebula/20 text-starlight text-sm font-medium transition-colors border border-white/20 hover:border-nebula/30"
                  >
                    تنظیمات بیشتر
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <GlassCard variant="default" className="p-12 text-center" animated>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full gradient-nebula flex items-center justify-center text-4xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <svg className="w-12 h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <h3 className="text-starlight font-bold text-xl mb-2">هنوز ترکی آپلود نکرده‌اید</h3>
            <p className="text-muted mb-6">اولین ترک خود را آپلود کنید و به دنیای موسیقی بپیوندید</p>
            <Link href="/dashboard/upload">
              <Button variant="primary" glow>
                آپلود اولین ترک
              </Button>
            </Link>
          </GlassCard>
        )}


      </div>
    </DashboardLayout>
  );
}
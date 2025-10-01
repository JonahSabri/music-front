'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { MusicCard } from '@/components/ui/MusicCard';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, use } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TrackDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const resolvedParams = use(params);
  const [track, setTrack] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [editingTrack, setEditingTrack] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && resolvedParams.id) {
      loadTrack();
    }
  }, [user, authLoading, router, mounted, resolvedParams.id]);

  const loadTrack = async () => {
    setIsLoading(true);
    try {
      const response = await api.getTrack(parseInt(resolvedParams.id));
      if (response.data && !response.error) {
        setTrack(response.data);
      } else {
        router.push('/dashboard/music');
      }
    } catch (error) {
      console.error('Error loading track:', error);
      router.push('/dashboard/music');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTrack = () => {
    setEditingTrack(track);
  };

  const handleDeleteTrack = async () => {
    try {
      const response = await api.deleteTrack(track.id);
      if (response.data && !response.error) {
        router.push('/dashboard/music');
      }
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const handleSaveEdit = async (updatedTrack: any) => {
    try {
      const response = await api.updateTrack(track.id, updatedTrack);
      if (response.data && !response.error) {
        setTrack({ ...track, ...updatedTrack });
        setEditingTrack(null);
      }
    } catch (error) {
      console.error('Error updating track:', error);
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

  if (!track) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-starlight text-xl mb-4">ترک یافت نشد</div>
            <Link href="/dashboard/music">
              <Button variant="primary">بازگشت به موسیقی‌ها</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <AnimatedBackground />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/music">
              <Button variant="secondary" className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                بازگشت
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-starlight">جزئیات ترک</h1>
          </div>
          
          {track.status === 'pending' && (
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleEditTrack}>
                ویرایش
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
              >
                حذف
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track Info & Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Track Card */}
            <GlassCard variant="default" className="p-6" animated>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  {track.cover_art ? (
                    <img src={track.cover_art} alt={track.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-nebula to-cosmic-violet flex items-center justify-center text-4xl">🎵</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-starlight mb-2">{track.title}</h2>
                  <p className="text-muted text-lg mb-4">{track.artist_name}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      track.status === 'published' ? 'bg-green-500/20 text-green-400' :
                      track.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                      track.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {track.status_display}
                    </span>
                    <span className="text-muted text-sm">
                      {new Date(track.created_at).toLocaleDateString('fa-IR')}
                    </span>
                  </div>

                  {/* Audio Player */}
                  <AudioPlayer
                    track={{
                      id: track.id,
                      title: track.title,
                      artist: track.artist_name,
                      audioUrl: track.audio_file,
                      coverImage: track.cover_art,
                      duration: track.duration
                    }}
                    variant="compact"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Track Details */}
            <GlassCard variant="default" className="p-6" animated>
              <h3 className="text-xl font-bold text-starlight mb-6">اطلاعات ترک</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-muted text-sm mb-1">آهنگساز</label>
                  <p className="text-starlight">{track.composer || 'نامشخص'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">ترانه‌سرا</label>
                  <p className="text-starlight">{track.lyricist || 'نامشخص'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">تنظیم‌کننده</label>
                  <p className="text-starlight">{track.arranger || 'نامشخص'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">ژانر اصلی</label>
                  <p className="text-starlight">{track.primary_genre || 'نامشخص'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">ژانر فرعی</label>
                  <p className="text-starlight">{track.secondary_genre || 'نامشخص'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">کد ISRC</label>
                  <p className="text-starlight font-mono">{track.isrc_code || 'در انتظار تولید'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">محتوای صریح</label>
                  <p className="text-starlight">{track.is_explicit ? 'بله' : 'خیر'}</p>
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">بی‌کلام</label>
                  <p className="text-starlight">{track.is_instrumental ? 'بله' : 'خیر'}</p>
                </div>
              </div>

              {track.lyrics && (
                <div className="mt-6">
                  <label className="block text-muted text-sm mb-2">متن ترانه</label>
                  <div className="bg-white/5 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <p className="text-starlight whitespace-pre-wrap">{track.lyrics}</p>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Platforms */}
            <GlassCard variant="default" className="p-6" animated>
              <h3 className="text-xl font-bold text-starlight mb-6">پلتفرم‌های پخش</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Spotify', icon: '🎵', color: 'from-green-400 to-green-600', status: track.status === 'published' ? 'active' : 'pending' },
                  { name: 'Apple Music', icon: '🍎', color: 'from-pink-500 to-red-500', status: track.status === 'published' ? 'active' : 'pending' },
                  { name: 'Amazon Music', icon: '🛒', color: 'from-blue-400 to-blue-600', status: track.status === 'published' ? 'active' : 'pending' },
                  { name: 'YouTube Music', icon: '📺', color: 'from-red-500 to-red-700', status: track.status === 'published' ? 'active' : 'pending' },
                  { name: 'TikTok', icon: '🎬', color: 'from-gray-800 to-black', status: track.status === 'published' ? 'active' : 'pending' },
                  { name: 'Instagram', icon: '📷', color: 'from-purple-500 to-pink-500', status: track.status === 'published' ? 'active' : 'pending' }
                ].map((platform, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                    platform.status === 'active' 
                      ? 'border-green-500/30 bg-green-500/10' 
                      : 'border-white/10 bg-white/5'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-lg`}>
                        {platform.icon}
                      </div>
                      <div>
                        <p className="text-starlight font-medium text-sm">{platform.name}</p>
                        <p className={`text-xs ${
                          platform.status === 'active' ? 'text-green-400' : 'text-muted'
                        }`}>
                          {platform.status === 'active' ? 'فعال' : 'در انتظار'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <GlassCard variant="default" className="p-6" animated>
              <h3 className="text-xl font-bold text-starlight mb-6">آمار</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted">بازدید کل</span>
                  <span className="text-starlight font-bold">{track.total_views || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">استریم‌ها</span>
                  <span className="text-starlight font-bold">{track.streams || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">دانلودها</span>
                  <span className="text-starlight font-bold">{track.downloads || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">درآمد</span>
                  <span className="text-green-400 font-bold">{track.earnings || 0} تومان</span>
                </div>
              </div>
            </GlassCard>


            {/* Quick Links */}
            <GlassCard variant="default" className="p-6" animated>
              <h3 className="text-xl font-bold text-starlight mb-6">لینک‌های سریع</h3>
              
              <div className="space-y-3">
                {track.status === 'published' && (
                  <>
                    <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white text-sm">S</div>
                      <span className="text-starlight text-sm">Spotify</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded bg-pink-500 flex items-center justify-center text-white text-sm">A</div>
                      <span className="text-starlight text-sm">Apple Music</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-white text-sm">Y</div>
                      <span className="text-starlight text-sm">YouTube Music</span>
                    </a>
                  </>
                )}
                <Link href={`/dashboard/analytics?track=${track.id}`} className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded bg-nebula flex items-center justify-center text-white text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-starlight text-sm">آمار تفصیلی</span>
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Edit Track Modal */}
        {editingTrack && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <GlassCard variant="default" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-starlight">ویرایش ترک</h2>
                  <button
                    onClick={() => setEditingTrack(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-starlight transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedTrack = {
                    title: formData.get('title') as string,
                    artist_name: formData.get('artist_name') as string,
                    composer: formData.get('composer') as string,
                    lyricist: formData.get('lyricist') as string,
                    arranger: formData.get('arranger') as string,
                    primary_genre: formData.get('primary_genre') as string,
                    secondary_genre: formData.get('secondary_genre') as string,
                    is_explicit: formData.get('is_explicit') === 'on',
                    is_instrumental: formData.get('is_instrumental') === 'on',
                    lyrics: formData.get('lyrics') as string,
                  };
                  handleSaveEdit(updatedTrack);
                }} className="space-y-4">
                  <div>
                    <label className="block text-starlight font-medium mb-2">عنوان ترک</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingTrack.title}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-starlight font-medium mb-2">نام هنرمند</label>
                    <input
                      type="text"
                      name="artist_name"
                      defaultValue={editingTrack.artist_name}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-starlight font-medium mb-2">آهنگساز</label>
                      <input
                        type="text"
                        name="composer"
                        defaultValue={editingTrack.composer || ''}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                      />
                    </div>
                    <div>
                      <label className="block text-starlight font-medium mb-2">ترانه‌سرا</label>
                      <input
                        type="text"
                        name="lyricist"
                        defaultValue={editingTrack.lyricist || ''}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-starlight font-medium mb-2">تنظیم‌کننده</label>
                    <input
                      type="text"
                      name="arranger"
                      defaultValue={editingTrack.arranger || ''}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-starlight font-medium mb-2">ژانر اصلی</label>
                      <select
                        name="primary_genre"
                        defaultValue={editingTrack.primary_genre || 'pop'}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                      >
                        <option value="pop">پاپ</option>
                        <option value="rock">راک</option>
                        <option value="hip-hop">هیپ‌هاپ</option>
                        <option value="electronic">الکترونیک</option>
                        <option value="classical">کلاسیک</option>
                        <option value="jazz">جاز</option>
                        <option value="country">کانتری</option>
                        <option value="folk">فولک</option>
                        <option value="r&b">آر اند بی</option>
                        <option value="reggae">رگه</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-starlight font-medium mb-2">ژانر فرعی</label>
                      <input
                        type="text"
                        name="secondary_genre"
                        defaultValue={editingTrack.secondary_genre || ''}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-starlight font-medium mb-2">متن ترانه</label>
                    <textarea
                      name="lyrics"
                      defaultValue={editingTrack.lyrics || ''}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_explicit"
                        defaultChecked={editingTrack.is_explicit}
                        className="ml-2"
                      />
                      <span className="text-starlight">محتوای صریح</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_instrumental"
                        defaultChecked={editingTrack.is_instrumental}
                        className="ml-2"
                      />
                      <span className="text-starlight">بی‌کلام</span>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" variant="primary" className="flex-1">
                      ذخیره تغییرات
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setEditingTrack(null)}
                      className="flex-1"
                    >
                      انصراف
                    </Button>
                  </div>
                </form>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <GlassCard variant="default" className="w-full max-w-md">
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-starlight mb-2">حذف ترک</h3>
                <p className="text-muted mb-6">
                  آیا مطمئن هستید که می‌خواهید این ترک را حذف کنید؟ این عمل قابل بازگشت نیست.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={handleDeleteTrack}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    حذف
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

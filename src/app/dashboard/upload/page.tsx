'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/ui/Notification';

type Step = 1 | 2 | 3 | 4 | 5;

export default function UploadMusicPage() {
  const router = useRouter();
  const { user, authLoading } = useAuth();
  const { addNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [canUpload, setCanUpload] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Release Information
    platforms: ['spotify', 'apple', 'amazon', 'youtube', 'tiktok'],
    releaseType: 'single',
    previouslyReleased: false,
    artistName: '',
    featuredArtists: '',
    releaseDate: '',
    label: '',
    
    // Step 2: Track & Artwork
    coverArt: null as File | null,
    language: 'persian',
    primaryGenre: 'pop',
    secondaryGenre: '',
    albumTitle: '',
    
    // Step 3: Audio Files
    audioFile: null as File | null,
    trackTitle: '',
    isCover: false,
    composer: '',
    lyricist: '',
    arranger: '',
    isExplicit: false,
    isInstrumental: false,
    lyrics: '',
    previewStart: '',
    
    // Step 4: Optional Extras
    shazam: false,
    storeMaximizer: false,
    youtubeContentId: false,
    
    // Step 5: Final Agreements
    confirmRights: false,
    confirmNoUnauthorized: false,
    acceptTerms: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      checkUploadPermission();
    }
  }, [user, authLoading, router, mounted]);

  const checkUploadPermission = async () => {
    try {
      const result = await api.canUploadTrack();
      if (result.data && !result.error) {
        setCanUpload(result.data);
        
        if (result.data) {
          setFormData(prev => ({
            ...prev,
            artistName: result.data.artist_name || user?.artist_name || '',
            label: result.data.artist_name || user?.artist_name || ''
          }));
        }
      } else {
        setCanUpload({ can_upload: false, message: result.error || 'خطا در بررسی مجوز آپلود' });
      }
    } catch (error) {
      console.error('Upload permission check failed:', error);
      setCanUpload({ can_upload: false, message: 'خطا در بررسی مجوز آپلود' });
    }
  };

  const steps = [
    { number: 1, title: 'اطلاعات اولیه' },
    { number: 2, title: 'آهنگ و کاور' },
    { number: 3, title: 'فایل‌های صوتی' },
    { number: 4, title: 'ویژگی‌های اضافی' },
    { number: 5, title: 'بازبینی نهایی' }
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((currentStep + 1) as Step);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as Step);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.artistName.trim()) {
      errors.push('نام هنری الزامی است');
    }
    
    if (!formData.trackTitle.trim() && !formData.albumTitle.trim()) {
      errors.push('عنوان آهنگ یا آلبوم الزامی است');
    }
    
    if (!formData.releaseDate) {
      errors.push('تاریخ انتشار الزامی است');
    }
    
    if (!formData.audioFile) {
      errors.push('فایل صوتی الزامی است');
    }
    
    if (!formData.coverArt) {
      errors.push('کاور آرت الزامی است');
    }
    
    if (!formData.confirmRights) {
      errors.push('لطفا مالکیت حقوق را تایید کنید');
    }
    
    if (!formData.acceptTerms) {
      errors.push('لطفا قوانین و مقررات را بپذیرید');
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(' • '));
      setIsLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      
      // Required fields
      submitData.append('title', formData.trackTitle || formData.albumTitle);
      submitData.append('artist_name', formData.artistName);
      submitData.append('release_type', formData.releaseType);
      submitData.append('release_date', formData.releaseDate);
      submitData.append('language', formData.language);
      submitData.append('primary_genre', formData.primaryGenre);
      submitData.append('platforms', JSON.stringify(formData.platforms));
      
      // Files
      submitData.append('audio_file', formData.audioFile!);
      submitData.append('cover_art', formData.coverArt!);

      // Optional fields
      if (formData.albumTitle) submitData.append('album_title', formData.albumTitle);
      if (formData.featuredArtists) submitData.append('featured_artists', formData.featuredArtists);
      if (formData.secondaryGenre) submitData.append('secondary_genre', formData.secondaryGenre);
      if (formData.composer) submitData.append('composer', formData.composer);
      if (formData.lyricist) submitData.append('lyricist', formData.lyricist);
      if (formData.arranger) submitData.append('arranger', formData.arranger);
      if (formData.label) submitData.append('label', formData.label);
      if (formData.lyrics) submitData.append('lyrics', formData.lyrics);
      
      // Booleans
      submitData.append('is_explicit', formData.isExplicit.toString());
      submitData.append('is_instrumental', formData.isInstrumental.toString());
      submitData.append('is_cover', formData.isCover.toString());
      submitData.append('previously_released', formData.previouslyReleased.toString());
      submitData.append('shazam_enabled', formData.shazam.toString());
      submitData.append('store_maximizer_enabled', formData.storeMaximizer.toString());
      submitData.append('youtube_content_id_enabled', formData.youtubeContentId.toString());

      const result = await api.uploadTrack(submitData);
      
      if (result.data && !result.error) {
        addNotification({
          type: 'success',
          title: 'آپلود موفق',
          message: 'ترک با موفقیت آپلود شد و برای بررسی ارسال گردید!'
        });
        router.push('/dashboard/music');
      } else {
        setError(result.error || 'خطا در آپلود ترک');
      }
    } catch (error) {
      console.error('Upload error:', error);
      addNotification({
        type: 'error',
        title: 'خطا در آپلود',
        message: 'خطا در آپلود ترک. لطفا دوباره تلاش کنید.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking permissions
  if (!mounted || authLoading || !canUpload) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-starlight text-xl">در حال بررسی مجوز...</div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error if can't upload
  if (!canUpload.can_upload) {
    return (
      <DashboardLayout>
        <AnimatedBackground />
        <div className="max-w-3xl mx-auto relative z-10 py-20">
          <GlassCard variant="default" className="p-12 text-center" animated>
            <div className="text-6xl mb-6">🚫</div>
            <h1 className="text-3xl font-bold text-starlight mb-4">امکان آپلود وجود ندارد</h1>
            <p className="text-muted text-lg mb-8">{canUpload.message}</p>
            <Button variant="primary" glow onClick={() => router.push('/dashboard/settings')}>
              خرید اشتراک
            </Button>
          </GlassCard>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number 
                    ? 'gradient-nebula text-white glow-purple' 
                    : 'bg-white/10 text-muted'
                } font-bold transition-all`}>
                  {step.number}
                </div>
                <div className="mr-3 flex-1">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-starlight' : 'text-muted'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 ${
                    currentStep > step.number ? 'bg-nebula' : 'bg-white/10'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <GlassCard variant="default" className="p-8" animated>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Artist Name Warning */}
          {canUpload.artist_name_locked && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-400">
                ℹ️ نام هنری شما: <strong>{canUpload.artist_name}</strong> (قابل تغییر نیست)
              </p>
            </div>
          )}

          {/* Step 1: Release Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-starlight mb-6">اطلاعات اولیه انتشار</h2>
              
              {/* Platform Selection */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  انتخاب پلتفرم‌ها
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Spotify', 'Apple Music', 'Amazon Music', 'YouTube Music', 'TikTok', 
                    'Instagram', 'Deezer', 'Tidal', 'Pandora'
                  ].map((platform) => (
                    <label key={platform} className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer transition-colors">
                      <input type="checkbox" defaultChecked className="ml-2" />
                      <span className="text-starlight">{platform}</span>
                    </label>
                  ))}
                </div>
                <button className="mt-3 text-nebula text-sm hover:text-nebula-purple-light">
                  ✓ انتخاب همه
                </button>
              </div>

              {/* Release Type */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  نوع انتشار
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border-2 border-nebula cursor-pointer">
                    <input 
                      type="radio" 
                      name="releaseType" 
                      value="single"
                      checked={formData.releaseType === 'single'}
                      onChange={(e) => setFormData({...formData, releaseType: e.target.value})}
                      className="ml-2" 
                    />
                    <div>
                      <div className="text-starlight font-medium">تک‌آهنگ (Single)</div>
                      <div className="text-muted text-sm">یک آهنگ</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer">
                    <input 
                      type="radio" 
                      name="releaseType" 
                      value="album"
                      checked={formData.releaseType === 'album'}
                      onChange={(e) => setFormData({...formData, releaseType: e.target.value})}
                      className="ml-2" 
                    />
                    <div>
                      <div className="text-starlight font-medium">آلبوم / EP</div>
                      <div className="text-muted text-sm">چند آهنگ</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Previously Released */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  آیا قبلاً منتشر شده است؟
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer">
                    <input 
                      type="radio" 
                      name="previouslyReleased" 
                      checked={formData.previouslyReleased === true}
                      onChange={() => setFormData({...formData, previouslyReleased: true})}
                      className="ml-2" 
                    />
                    <span className="text-starlight">بله</span>
                  </label>
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border-2 border-nebula cursor-pointer">
                    <input 
                      type="radio" 
                      name="previouslyReleased" 
                      checked={formData.previouslyReleased === false}
                      onChange={() => setFormData({...formData, previouslyReleased: false})}
                      className="ml-2" 
                    />
                    <span className="text-starlight">خیر</span>
                  </label>
                </div>
              </div>

              {/* Artist Name */}
              <div>
                <label htmlFor="artistName" className="block text-starlight font-medium mb-2">
                  نام هنرمند / گروه
                </label>
                <input
                  type="text"
                  id="artistName"
                  value={formData.artistName}
                  onChange={(e) => setFormData({...formData, artistName: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="Artist Name"
                  disabled={canUpload.artist_name_locked}
                />
                {canUpload.artist_name_locked && (
                  <p className="text-muted text-xs mt-1">⚠️ نام هنری قفل شده است</p>
                )}
              </div>

              {/* Featured Artists */}
              <div>
                <label htmlFor="featuredArtists" className="block text-starlight font-medium mb-2">
                  هنرمندان همکار (Feat) - اختیاری
                </label>
                <input
                  type="text"
                  id="featuredArtists"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="Featured Artists (comma separated)"
                />
              </div>

              {/* Release Date */}
              <div>
                <label htmlFor="releaseDate" className="block text-starlight font-medium mb-2">
                  تاریخ انتشار
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  required
                />
                <p className="text-muted text-sm mt-2">
                  💡 برای Pre-Save حداقل ۴ هفته آینده را انتخاب کنید
                </p>
              </div>

              {/* Label */}
              <div>
                <label htmlFor="label" className="block text-starlight font-medium mb-2">
                  لیبل موسیقی (اختیاری)
                </label>
                <input
                  type="text"
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="Label Name (default: Artist Name)"
                />
              </div>
            </div>
          )}

          {/* Step 2: Track & Artwork */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-starlight mb-6">اطلاعات آهنگ و کاور آرت</h2>
              
              {/* Cover Art Upload */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  آپلود کاور آرت
                </label>
                <div 
                  className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-nebula transition-colors cursor-pointer bg-white/5"
                  onClick={() => document.getElementById('coverArt')?.click()}
                >
                  <div className="text-6xl mb-4">🎨</div>
                  <div className="text-starlight font-medium mb-2">
                    {formData.coverArt ? formData.coverArt.name : 'فایل خود را اینجا رها کنید یا کلیک کنید'}
                  </div>
                  <div className="text-muted text-sm">
                    حداقل 3000x3000 پیکسل • JPG یا PNG
                  </div>
                </div>
                <input
                  type="file"
                  id="coverArt"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({...formData, coverArt: file});
                  }}
                  className="hidden"
                />
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ کاور آرت نباید شامل آدرس سایت، لوگوی شبکه‌های اجتماعی یا نوشته‌های تبلیغاتی باشد
                  </p>
                </div>
              </div>

              {/* Album Title - Only for Album/EP */}
              {formData.releaseType === 'album' && (
                <div>
                  <label htmlFor="albumTitle" className="block text-starlight font-medium mb-2">
                    عنوان آلبوم / EP
                  </label>
                  <input
                    type="text"
                    id="albumTitle"
                    value={formData.albumTitle}
                    onChange={(e) => setFormData({...formData, albumTitle: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                    placeholder="Album or EP Title"
                    required
                  />
                </div>
              )}

              {/* Language */}
              <div>
                <label htmlFor="language" className="block text-starlight font-medium mb-2">
                  زبان اصلی اثر
                </label>
                <select
                  id="language"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                >
                  <option>فارسی</option>
                  <option>انگلیسی</option>
                  <option>عربی</option>
                  <option>ترکی</option>
                  <option>بی‌کلام</option>
                </select>
              </div>

              {/* Genres */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primaryGenre" className="block text-starlight font-medium mb-2">
                    ژانر اصلی
                  </label>
                  <select
                    id="primaryGenre"
                    value={formData.primaryGenre}
                    onChange={(e) => setFormData({...formData, primaryGenre: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
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
                    <option value="blues">بلوز</option>
                    <option value="metal">متال</option>
                    <option value="alternative">آلترناتیو</option>
                    <option value="indie">ایندی</option>
                    <option value="latin">لاتین</option>
                    <option value="world">ورلد</option>
                    <option value="new-age">نیو ایج</option>
                    <option value="soundtrack">موسیقی متن</option>
                    <option value="children">کودک</option>
                    <option value="comedy">کمدی</option>
                    <option value="spoken-word">کلامی</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="secondaryGenre" className="block text-starlight font-medium mb-2">
                    ژانر فرعی
                  </label>
                  <select
                    id="secondaryGenre"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  >
                    <option>Dance-Pop</option>
                    <option>Synth-Pop</option>
                    <option>Dream Pop</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Audio Files */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-starlight mb-6">آپلود فایل‌های صوتی</h2>
              
              {/* Audio Upload */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  فایل صوتی
                </label>
                <div 
                  className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-nebula transition-colors cursor-pointer bg-white/5"
                  onClick={() => document.getElementById('audioFile')?.click()}
                >
                  <div className="text-6xl mb-4">🎵</div>
                  <div className="text-starlight font-medium mb-2">
                    {formData.audioFile ? formData.audioFile.name : 'فایل WAV یا FLAC خود را آپلود کنید'}
                  </div>
                  <div className="text-muted text-sm">
                    بهترین کیفیت برای پلتفرم‌های استریمینگ
                  </div>
                </div>
                <input
                  type="file"
                  id="audioFile"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({...formData, audioFile: file});
                  }}
                  className="hidden"
                />
              </div>

              {/* Track Title - Only for Single */}
              {formData.releaseType === 'single' && (
                <div>
                  <label htmlFor="trackTitle" className="block text-starlight font-medium mb-2">
                    عنوان آهنگ
                  </label>
                  <input
                    type="text"
                    id="trackTitle"
                    value={formData.trackTitle}
                    onChange={(e) => setFormData({...formData, trackTitle: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                    placeholder="Track Title"
                    required
                  />
                </div>
              )}

              {/* Is Cover */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  آیا این آهنگ بازخوانی (Cover) است؟
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer">
                    <input type="radio" name="isCover" className="ml-2" />
                    <span className="text-starlight">بله</span>
                  </label>
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border-2 border-nebula cursor-pointer">
                    <input type="radio" name="isCover" defaultChecked className="ml-2" />
                    <span className="text-starlight">خیر</span>
                  </label>
                </div>
              </div>

              {/* Songwriter Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="composer" className="block text-starlight font-medium mb-2">
                    آهنگساز (Composer) - نام واقعی
                  </label>
                  <input
                    type="text"
                    id="composer"
                    value={formData.composer}
                    onChange={(e) => setFormData({...formData, composer: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                    placeholder="نام واقعی آهنگساز"
                  />
                </div>
                <div>
                  <label htmlFor="lyricist" className="block text-starlight font-medium mb-2">
                    شاعر (Lyricist) - نام واقعی
                  </label>
                  <input
                    type="text"
                    id="lyricist"
                    value={formData.lyricist}
                    onChange={(e) => setFormData({...formData, lyricist: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                    placeholder="نام واقعی شاعر"
                  />
                </div>
                <div>
                  <label htmlFor="arranger" className="block text-starlight font-medium mb-2">
                    تنظیم‌کننده (Arranger) - نام واقعی
                  </label>
                  <input
                    type="text"
                    id="arranger"
                    value={formData.arranger}
                    onChange={(e) => setFormData({...formData, arranger: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                    placeholder="نام واقعی تنظیم‌کننده"
                  />
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <input 
                    type="checkbox" 
                    checked={formData.isExplicit}
                    onChange={(e) => setFormData({...formData, isExplicit: e.target.checked})}
                    className="ml-2" 
                  />
                  <span className="text-starlight">محتوای صریح (Explicit)</span>
                </label>
                <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <input 
                    type="checkbox" 
                    checked={formData.isInstrumental}
                    onChange={(e) => setFormData({...formData, isInstrumental: e.target.checked})}
                    className="ml-2" 
                  />
                  <span className="text-starlight">بی‌کلام (Instrumental)</span>
                </label>
              </div>

              {/* Preview Start Time */}
              <div>
                <label htmlFor="previewStart" className="block text-starlight font-medium mb-2">
                  زمان شروع پیش‌نمایش (برای TikTok و Apple Music)
                </label>
                <input
                  type="text"
                  id="previewStart"
                  value={formData.previewStart}
                  onChange={(e) => setFormData({...formData, previewStart: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="e.g. 01:15"
                />
              </div>

              {/* Lyrics */}
              {!formData.isInstrumental && (
                <div>
                  <label htmlFor="lyrics" className="block text-starlight font-medium mb-2">
                    متن ترانه (اختیاری)
                  </label>
                  <textarea
                    id="lyrics"
                    value={formData.lyrics}
                    onChange={(e) => setFormData({...formData, lyrics: e.target.value})}
                    placeholder="متن ترانه خود را اینجا وارد کنید..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-nebula transition-colors resize-none"
                  />
                  <p className="text-muted text-sm mt-1">
                    متن ترانه برای نمایش در پلتفرم‌های موسیقی (اختیاری)
                  </p>
                </div>
              )}

              {/* ISRC Code */}
              <div>
                <label className="block text-starlight font-medium mb-3">
                  کد ISRC
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border-2 border-nebula cursor-pointer">
                    <input type="radio" name="isrc" defaultChecked className="ml-2" />
                    <span className="text-starlight">برایم یک کد بساز (پیشنهادی)</span>
                  </label>
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                    <input type="radio" name="isrc" className="ml-2" />
                    <span className="text-starlight">کد خودم را وارد می‌کنم</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Optional Extras */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-starlight mb-6">ویژگی‌های اضافی</h2>
              
              <div className="text-center py-12">
                <div className="text-6xl mb-6">🚧</div>
                <h3 className="text-2xl font-bold text-starlight mb-4">در حال توسعه</h3>
                <p className="text-muted text-lg mb-8">
                  ویژگی‌های اضافی مانند Shazam، Store Maximizer و YouTube Content ID در نسخه‌های آینده اضافه خواهند شد
                </p>
                <p className="text-muted">
                  فعلاً می‌توانید به مرحله بعد بروید
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-starlight mb-6">بازبینی و تایید نهایی</h2>
              
              {/* Summary */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-starlight mb-4">خلاصه انتشار</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted">نوع انتشار:</span>
                    <span className="text-starlight font-medium">{formData.releaseType === 'single' ? 'تک‌آهنگ' : 'آلبوم/EP'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">نام هنرمند:</span>
                    <span className="text-starlight font-medium">{formData.artistName || '❌ الزامی'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">عنوان:</span>
                    <span className="text-starlight font-medium">
                      {formData.releaseType === 'single' 
                        ? (formData.trackTitle || '❌ الزامی')
                        : (formData.albumTitle || '❌ الزامی')
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">تاریخ انتشار:</span>
                    <span className="text-starlight font-medium">{formData.releaseDate || '❌ الزامی'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">ژانر:</span>
                    <span className="text-starlight font-medium">{formData.primaryGenre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">فایل صوتی:</span>
                    <span className="text-starlight font-medium">{formData.audioFile ? '✅' : '❌ الزامی'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">کاور آرت:</span>
                    <span className="text-starlight font-medium">{formData.coverArt ? '✅' : '❌ الزامی'}</span>
                  </div>
                  {formData.featuredArtists && (
                    <div className="flex justify-between">
                      <span className="text-muted">هنرمندان همکار:</span>
                      <span className="text-starlight font-medium">{formData.featuredArtists}</span>
                    </div>
                  )}
                  {formData.composer && (
                    <div className="flex justify-between">
                      <span className="text-muted">آهنگساز:</span>
                      <span className="text-starlight font-medium">{formData.composer}</span>
                    </div>
                  )}
                  {formData.lyricist && (
                    <div className="flex justify-between">
                      <span className="text-muted">شاعر:</span>
                      <span className="text-starlight font-medium">{formData.lyricist}</span>
                    </div>
                  )}
                  {formData.arranger && (
                    <div className="flex justify-between">
                      <span className="text-muted">تنظیم‌کننده:</span>
                      <span className="text-starlight font-medium">{formData.arranger}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmations */}
              <div className="space-y-4">
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10">
                  <input 
                    type="checkbox" 
                    checked={formData.confirmRights}
                    onChange={(e) => setFormData({...formData, confirmRights: e.target.checked})}
                    className="mt-1 ml-3" 
                  />
                  <span className="text-starlight">
                    تایید می‌کنم که تمام حقوق این اثر متعلق به من است و از آن استفاده مجاز دارم
                  </span>
                </label>
                
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10">
                  <input 
                    type="checkbox" 
                    checked={formData.confirmNoUnauthorized}
                    onChange={(e) => setFormData({...formData, confirmNoUnauthorized: e.target.checked})}
                    className="mt-1 ml-3" 
                  />
                  <span className="text-starlight">
                    تایید می‌کنم که از تصاویر، صداها یا محتوای غیرمجاز استفاده نکرده‌ام
                  </span>
                </label>
                
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10">
                  <input 
                    type="checkbox" 
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                    className="mt-1 ml-3" 
                  />
                  <span className="text-starlight">
                    قوانین و مقررات AstroTunes را مطالعه کرده و می‌پذیرم
                  </span>
                </label>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✓ همه چیز آماده است! با کلیک روی "ارسال نهایی" اثر شما برای بررسی ارسال می‌شود
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="disabled:opacity-30"
            >
              ← مرحله قبل
            </Button>
            
            <div className="text-muted text-sm">
              مرحله {currentStep} از {steps.length}
            </div>
            
            {currentStep < 5 ? (
              <Button variant="primary" onClick={nextStep} glow>
                مرحله بعد →
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={handleSubmit} 
                glow 
                className="px-8"
                disabled={isLoading || !formData.confirmRights || !formData.acceptTerms}
              >
                {isLoading ? 'در حال ارسال...' : '🚀 ارسال نهایی'}
              </Button>
            )}
          </div>
        </GlassCard>
        
        </div>
      
    </DashboardLayout>
  );
}

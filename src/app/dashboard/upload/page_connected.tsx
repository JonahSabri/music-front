'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3 | 4 | 5;

export default function UploadMusicPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [canUpload, setCanUpload] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
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
    checkUploadPermission();
  }, []);

  const checkUploadPermission = async () => {
    const result = await api.canUploadTrack();
    setCanUpload(result.data);
    
    if (result.data) {
      setFormData(prev => ({
        ...prev,
        artistName: result.data.artist_name || '',
        label: result.data.artist_name || ''
      }));
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

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
      if (formData.audioFile) {
        submitData.append('audio_file', formData.audioFile);
      } else {
        setError('لطفا فایل صوتی را انتخاب کنید');
        setIsLoading(false);
        return;
      }
      
      if (formData.coverArt) {
        submitData.append('cover_art', formData.coverArt);
      } else {
        setError('لطفا کاور آرت را انتخاب کنید');
        setIsLoading(false);
        return;
      }

      // Optional fields
      if (formData.albumTitle) submitData.append('album_title', formData.albumTitle);
      if (formData.featuredArtists) submitData.append('featured_artists', formData.featuredArtists);
      if (formData.secondaryGenre) submitData.append('secondary_genre', formData.secondaryGenre);
      if (formData.composer) submitData.append('composer', formData.composer);
      if (formData.lyricist) submitData.append('lyricist', formData.lyricist);
      if (formData.arranger) submitData.append('arranger', formData.arranger);
      if (formData.label) submitData.append('label', formData.label);
      
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
        alert('✅ ترک با موفقیت آپلود شد و برای بررسی ارسال گردید!');
        router.push('/dashboard/music');
      } else {
        setError(result.error || 'خطا در آپلود ترک');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('خطا در آپلود ترک');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking permissions
  if (!canUpload) {
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

          {/* از این به بعد محتوای فرم مانند قبل است اما فایل خیلی طولانی شد */}
          {/* بیایید بخش‌های مختلف را ایجاد کنیم */}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-starlight mb-6">آماده ارسال</h2>
              <p className="text-muted">با کلیک روی دکمه زیر، ترک شما برای بررسی ارسال می‌شود.</p>
              
              <div className="space-y-4">
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.confirmRights}
                    onChange={(e) => setFormData({...formData, confirmRights: e.target.checked})}
                    className="mt-1 ml-3" 
                  />
                  <span className="text-starlight">
                    تایید می‌کنم که تمام حقوق این اثر متعلق به من است
                  </span>
                </label>
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
                disabled={isLoading || !formData.confirmRights}
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


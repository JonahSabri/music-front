'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

type Step = 1 | 2 | 3 | 4 | 5;

export default function UploadMusicPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Step 1: Release Information
    platforms: ['spotify', 'apple', 'amazon'],
    releaseType: 'single',
    previouslyReleased: false,
    artistName: 'علی احمدی',
    featuredArtists: '',
    releaseDate: '',
    label: 'علی احمدی',
    
    // Step 2: Track & Artwork
    coverArt: null,
    language: 'persian',
    primaryGenre: 'pop',
    secondaryGenre: 'dance-pop',
    albumTitle: '',
    
    // Step 3: Audio Files
    tracks: [],
    
    // Step 4: Optional Extras
    shazam: false,
    storeMaximizer: false,
    youtubeContentId: false,
    
    // Step 5: Final Agreements
    confirmRights: false,
    confirmNoUnauthorized: false,
    acceptTerms: false
  });

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

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    // Handle final submission
  };

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
                    <input type="radio" name="releaseType" defaultChecked className="ml-2" />
                    <div>
                      <div className="text-starlight font-medium">تک‌آهنگ (Single)</div>
                      <div className="text-muted text-sm">یک آهنگ</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-nebula cursor-pointer">
                    <input type="radio" name="releaseType" className="ml-2" />
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
                    <input type="radio" name="previouslyReleased" className="ml-2" />
                    <span className="text-starlight">بله</span>
                  </label>
                  <label className="flex items-center p-4 rounded-lg bg-white/5 border-2 border-nebula cursor-pointer">
                    <input type="radio" name="previouslyReleased" defaultChecked className="ml-2" />
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
                  defaultValue="علی احمدی"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="Artist Name"
                />
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
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
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
                  defaultValue="علی احمدی"
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
                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-nebula transition-colors cursor-pointer bg-white/5">
                  <div className="text-6xl mb-4">🎨</div>
                  <div className="text-starlight font-medium mb-2">
                    فایل خود را اینجا رها کنید یا کلیک کنید
                  </div>
                  <div className="text-muted text-sm">
                    حداقل 3000x3000 پیکسل • JPG یا PNG
                  </div>
                </div>
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ کاور آرت نباید شامل آدرس سایت، لوگوی شبکه‌های اجتماعی یا نوشته‌های تبلیغاتی باشد
                  </p>
                </div>
              </div>

              {/* Album Title */}
              <div>
                <label htmlFor="albumTitle" className="block text-starlight font-medium mb-2">
                  عنوان آلبوم / تک‌آهنگ
                </label>
                <input
                  type="text"
                  id="albumTitle"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="Album or EP Title"
                />
              </div>

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
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  >
                    <option>Pop</option>
                    <option>Rock</option>
                    <option>Hip Hop</option>
                    <option>Electronic</option>
                    <option>Classical</option>
                    <option>Jazz</option>
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
                <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-nebula transition-colors cursor-pointer bg-white/5">
                  <div className="text-6xl mb-4">🎵</div>
                  <div className="text-starlight font-medium mb-2">
                    فایل WAV یا FLAC خود را آپلود کنید
                  </div>
                  <div className="text-muted text-sm">
                    بهترین کیفیت برای پلتفرم‌های استریمینگ
                  </div>
                </div>
              </div>

              {/* Track Title */}
              <div>
                <label htmlFor="trackTitle" className="block text-starlight font-medium mb-2">
                  عنوان آهنگ
                </label>
                <input
                  type="text"
                  id="trackTitle"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="Track Title"
                />
              </div>

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
                    آهنگساز (Composer)
                  </label>
                  <input
                    type="text"
                    id="composer"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  />
                </div>
                <div>
                  <label htmlFor="lyricist" className="block text-starlight font-medium mb-2">
                    شاعر (Lyricist)
                  </label>
                  <input
                    type="text"
                    id="lyricist"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  />
                </div>
                <div>
                  <label htmlFor="arranger" className="block text-starlight font-medium mb-2">
                    تنظیم‌کننده (Arranger)
                  </label>
                  <input
                    type="text"
                    id="arranger"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  />
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <input type="checkbox" className="ml-2" />
                  <span className="text-starlight">محتوای صریح (Explicit)</span>
                </label>
                <label className="flex items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <input type="checkbox" className="ml-2" />
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
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50"
                  placeholder="e.g. 01:15"
                />
              </div>

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
              <p className="text-muted mb-6">
                این ویژگی‌ها اختیاری هستند و می‌توانند قدرت حضور موسیقی شما را افزایش دهند
              </p>

              {/* Shazam & Siri */}
              <label className="flex items-start p-6 rounded-xl bg-white/5 border border-white/10 hover:border-nebula cursor-pointer transition-colors group">
                <input type="checkbox" className="mt-1 ml-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-starlight font-bold text-lg">Shazam & Siri Integration</span>
                    <span className="text-supernova font-bold">$2.99</span>
                  </div>
                  <p className="text-muted text-sm">
                    موسیقی شما در Shazam قابل شناسایی خواهد بود و Siri می‌تواند آن را پخش کند
                  </p>
                </div>
              </label>

              {/* Store Maximizer */}
              <label className="flex items-start p-6 rounded-xl bg-white/5 border border-white/10 hover:border-nebula cursor-pointer transition-colors group">
                <input type="checkbox" className="mt-1 ml-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-starlight font-bold text-lg">Store Maximizer</span>
                    <span className="text-supernova font-bold">$4.99</span>
                  </div>
                  <p className="text-muted text-sm">
                    اثر شما به صورت خودکار به پلتفرم‌های جدیدی که در آینده اضافه می‌شوند ارسال خواهد شد
                  </p>
                </div>
              </label>

              {/* YouTube Content ID */}
              <label className="flex items-start p-6 rounded-xl bg-white/5 border border-white/10 hover:border-nebula cursor-pointer transition-colors group">
                <input type="checkbox" className="mt-1 ml-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-starlight font-bold text-lg">YouTube Content ID</span>
                    <span className="text-supernova font-bold">20% درآمد</span>
                  </div>
                  <p className="text-muted text-sm">
                    هر زمان که از موسیقی شما در یوتیوب استفاده شود، درآمد کسب کنید. ما 20% کمیسیون دریافت می‌کنیم
                  </p>
                </div>
              </label>

              <div className="mt-6 p-4 bg-nebula/10 border border-nebula/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-starlight font-medium">مجموع هزینه‌های اضافی:</span>
                  <span className="text-supernova font-bold text-xl">$0.00</span>
                </div>
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
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted">نوع انتشار:</span>
                    <span className="text-starlight font-medium mr-2">تک‌آهنگ</span>
                  </div>
                  <div>
                    <span className="text-muted">نام هنرمند:</span>
                    <span className="text-starlight font-medium mr-2">علی احمدی</span>
                  </div>
                  <div>
                    <span className="text-muted">تعداد پلتفرم‌ها:</span>
                    <span className="text-starlight font-medium mr-2">۹ پلتفرم</span>
                  </div>
                  <div>
                    <span className="text-muted">تاریخ انتشار:</span>
                    <span className="text-starlight font-medium mr-2">۱۵ اردیبهشت ۱۴۰۴</span>
                  </div>
                </div>
              </div>

              {/* Confirmations */}
              <div className="space-y-4">
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10">
                  <input type="checkbox" required className="mt-1 ml-3" />
                  <span className="text-starlight">
                    تایید می‌کنم که تمام حقوق این اثر متعلق به من است و از آن استفاده مجاز دارم
                  </span>
                </label>
                
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10">
                  <input type="checkbox" required className="mt-1 ml-3" />
                  <span className="text-starlight">
                    تایید می‌کنم که از تصاویر، صداها یا محتوای غیرمجاز استفاده نکرده‌ام
                  </span>
                </label>
                
                <label className="flex items-start p-4 rounded-lg bg-white/5 border border-white/10">
                  <input type="checkbox" required className="mt-1 ml-3" />
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
              <Button variant="primary" onClick={handleSubmit} glow className="px-8">
                🚀 ارسال نهایی
              </Button>
            )}
          </div>
        </GlassCard>
        
        </div>
      
    </DashboardLayout>
  );
}

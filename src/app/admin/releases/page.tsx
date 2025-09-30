'use client';

import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function AdminReleasesPage() {
  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const pendingReleases = [
    {
      id: 1,
      title: 'سفر به ماه',
      artist: 'علی احمدی',
      type: 'Single',
      submittedAt: '۱ ساعت پیش',
      cover: '🎵',
      audioFile: 'track.wav',
      platforms: 9,
      metadata: {
        genre: 'Pop',
        language: 'Persian',
        releaseDate: '2024-04-15',
        isrc: 'USRC17607839'
      }
    },
    {
      id: 2,
      title: 'کهکشان آبی',
      artist: 'سارا کریمی',
      type: 'Album',
      submittedAt: '۳ ساعت پیش',
      cover: '🎶',
      audioFile: 'album.wav',
      platforms: 12,
      metadata: {
        genre: 'Electronic',
        language: 'Instrumental',
        releaseDate: '2024-04-20',
        isrc: 'USRC17607840'
      }
    },
  ];

  const rejectReasons = [
    'کیفیت صوتی پایین',
    'مشکل در کاور آرت (رزولوشن پایین)',
    'نوشته‌های تبلیغاتی در کاور',
    'نقض کپی‌رایت',
    'اطلاعات ناقص یا نادرست',
    'محتوای نامناسب',
  ];

  const handleApprove = (id: number) => {
    console.log('Approving release:', id);
    // Handle approval logic
    alert('اثر تایید شد و به صف ارسال به پلتفرم‌ها اضافه شد');
  };

  const handleReject = (id: number) => {
    if (!rejectReason) {
      alert('لطفاً دلیل رد شدن را انتخاب کنید');
      return;
    }
    console.log('Rejecting release:', id, 'Reason:', rejectReason);
    alert('اثر رد شد و پیام برای هنرمند ارسال شد');
    setSelectedRelease(null);
    setRejectReason('');
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2" style={{fontFamily: 'var(--font-display)'}}>
            مدیریت آثار
          </h1>
          <p className="text-muted">
            بررسی و تایید آثار ارسال شده
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-4 mb-6">
          <button className="px-4 py-2 rounded-lg bg-yellow-500 text-deep-space font-medium">
            در صف بررسی ({pendingReleases.length})
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            تایید شده
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 text-muted hover:bg-white/20 transition-colors">
            رد شده
          </button>
        </div>

        {/* Releases Queue */}
        <div className="space-y-6">
          {pendingReleases.map((release) => (
            <div key={release.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg gradient-nebula flex items-center justify-center text-4xl">
                    {release.cover}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-starlight mb-1">{release.title}</h3>
                    <p className="text-muted">
                      {release.artist} • {release.type} • ارسال شده {release.submittedAt}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="px-3 py-1 rounded-full bg-nebula/20 text-nebula text-sm">
                        {release.platforms} پلتفرم
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-starlight text-sm">
                        {release.metadata.genre}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedRelease(selectedRelease === release.id ? null : release.id)}
                  >
                    {selectedRelease === release.id ? 'بستن جزئیات' : 'مشاهده جزئیات'}
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedRelease === release.id && (
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Metadata */}
                    <div>
                      <h4 className="text-lg font-bold text-starlight mb-4">اطلاعات متادیتا</h4>
                      <div className="space-y-3 bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between">
                          <span className="text-muted">ژانر:</span>
                          <span className="text-starlight font-medium">{release.metadata.genre}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">زبان:</span>
                          <span className="text-starlight font-medium">{release.metadata.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">تاریخ انتشار:</span>
                          <span className="text-starlight font-medium">{release.metadata.releaseDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">کد ISRC:</span>
                          <span className="text-starlight font-medium font-mono text-sm">{release.metadata.isrc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Audio Preview */}
                    <div>
                      <h4 className="text-lg font-bold text-starlight mb-4">پیش‌نمایش صوتی</h4>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <button className="w-12 h-12 rounded-full gradient-nebula flex items-center justify-center hover:opacity-80 transition-opacity">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                          <div className="flex-1">
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div className="bg-nebula h-2 rounded-full" style={{width: '0%'}}></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted mt-1">
                              <span>0:00</span>
                              <span>3:45</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-muted text-sm">
                          📁 {release.audioFile} • WAV • 44.1kHz • 16bit
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quality Checks */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-starlight mb-4">بررسی‌های خودکار کیفیت</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'رزولوشن کاور', status: 'pass', value: '3000x3000' },
                        { label: 'فرمت صوتی', status: 'pass', value: 'WAV' },
                        { label: 'بیت‌ریت', status: 'pass', value: '16bit' },
                        { label: 'متادیتا', status: 'pass', value: 'کامل' },
                      ].map((check, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-3 border border-green-500/30">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-muted text-sm">{check.label}</span>
                            <span className="text-green-400">✓</span>
                          </div>
                          <div className="text-starlight font-medium text-sm">{check.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-lg font-bold text-starlight mb-4">اقدامات</h4>
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <Button 
                          variant="primary" 
                          className="w-full bg-green-500 hover:bg-green-600"
                          onClick={() => handleApprove(release.id)}
                        >
                          ✅ تایید و ارسال به پلتفرم‌ها
                        </Button>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-3">
                          <select
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight focus:outline-none focus:border-red-500"
                          >
                            <option value="">انتخاب دلیل رد شدن...</option>
                            {rejectReasons.map((reason) => (
                              <option key={reason} value={reason}>{reason}</option>
                            ))}
                          </select>
                          <textarea
                            placeholder="پیام سفارشی برای هنرمند (اختیاری)..."
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-red-500 resize-none"
                            rows={3}
                          />
                          <Button 
                            variant="outline" 
                            className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                            onClick={() => handleReject(release.id)}
                          >
                            ❌ رد کردن اثر
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions (when collapsed) */}
              {selectedRelease !== release.id && (
                <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleApprove(release.id)}
                  >
                    ✅ تایید سریع
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-500 text-red-400"
                    onClick={() => setSelectedRelease(release.id)}
                  >
                    ❌ رد کردن
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {pendingReleases.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✨</div>
            <div className="text-2xl font-bold text-starlight mb-2">همه آثار بررسی شدند!</div>
            <div className="text-muted">در حال حاضر اثری در صف بررسی نیست</div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

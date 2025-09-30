'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const primaryItems: NavItem[] = [
  { icon: '🏠', label: 'داشبورد', href: '/dashboard' },
  { icon: '📤', label: 'آپلود', href: '/dashboard/upload' },
  { icon: '📊', label: 'آمار', href: '/dashboard/analytics' },
  { icon: '🎵', label: 'موسیقی', href: '/dashboard/music' },
  { icon: '💰', label: 'کیف پول', href: '/dashboard/wallet' }
];

const moreItems: NavItem[] = [
  { icon: '⚙️', label: 'تنظیمات', href: '/dashboard/settings' },
  { icon: '❓', label: 'راهنما', href: '/dashboard' },
  { icon: '📬', label: 'تیکت‌ها', href: '/dashboard' },
  { icon: '📢', label: 'اعلان‌ها', href: '/dashboard' },
  { icon: '🛰️', label: 'درباره', href: '/' }
];

export const MobileNav = () => {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const items = showMore ? moreItems : primaryItems;

  // Reset on route change and when clicking main panel
  useEffect(() => {
    setShowMore(false);
  }, [pathname]);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div className="glass-strong rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Top strip with toggle */}
        <div className="flex items-center justify-between px-4 pt-3 text-xs text-muted">
          <button
            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setShowMore(false)}
          >
            پنل اصلی
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition-colors ${showMore ? 'bg-nebula text-white' : 'bg-white/5 hover:bg-white/10'}`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'بازگشت' : 'بیشتر'}
          </button>
        </div>

        {/* Items */}
        <div className={`grid grid-cols-5 gap-1 px-2 pb-2 transition-all duration-300 ${showMore ? 'animate-slide-up' : 'animate-fade-in'}`}>
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="group">
                <div className={`m-1 flex flex-col items-center justify-center rounded-xl px-3 py-2 transition-all ${active ? 'bg-nebula text-white glow-purple' : 'hover:bg-white/10 text-starlight/80'}`}>
                  <span className="text-xl mb-1 group-active:scale-95">{item.icon}</span>
                  <span className="text-[11px] leading-none">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Ensure the panel resets when route changes to avoid leaking the "more" state
export const __MobileNavRouteReset = () => {
  const pathname = usePathname();
  const [, setTick] = useState(0);
  useEffect(() => {
    setTick((t) => t + 1);
  }, [pathname]);
  return null;
};



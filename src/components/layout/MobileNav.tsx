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
  { icon: '🎵', label: 'موسیقی', href: '/dashboard/music' },
  { icon: '📊', label: 'آمار', href: '/dashboard/analytics' },
  { icon: '💰', label: 'کیف پول', href: '/dashboard/wallet' },
];

const moreItems: NavItem[] = [
  { icon: '🧾', label: 'تاریخچه', href: '/dashboard/wallet#transactions' },
  { icon: '⚙️', label: 'تنظیمات', href: '/dashboard/settings' },
  // Fix wrong destinations so they are unique and meaningful
  { icon: '📬', label: 'تیکت‌ها', href: '/dashboard/tickets' },
  { icon: '📢', label: 'اعلان‌ها', href: '/dashboard/notifications' },
  { icon: '❓', label: 'راهنما', href: '/dashboard/help' },
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[95%] max-w-md">
      {/* Multi-layer Floating Effects */}
      <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-r from-nebula/30 to-supernova/30 blur-2xl opacity-70 animate-pulse"></div>
      <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-r from-deep-space/20 to-galaxy/30 blur-xl"></div>
      <div className="absolute inset-0 -m-2 rounded-2xl bg-gradient-to-r from-void/40 to-deep-space/60 blur-lg"></div>
      
      <div className="relative bg-gradient-to-br from-deep-space/80 via-void/70 to-deep-space/80 rounded-3xl border border-starlight/30 backdrop-blur-3xl shadow-2xl overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          {/* Floating Orbs */}
          <div className="absolute top-3 right-6 w-3 h-3 bg-gradient-to-r from-nebula to-supernova rounded-full animate-ping"></div>
          <div className="absolute bottom-3 left-6 w-2 h-2 bg-gradient-to-r from-supernova to-yellow-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white/40 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
          
          {/* Geometric Patterns */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-nebula/60 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-supernova/60 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          
          {/* Wave Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-nebula/30 to-transparent opacity-50"></div>
        </div>
        
        {/* Top Control Strip */}
        <div className="relative flex items-center justify-between px-6 pt-4 pb-2 text-sm">
          <button
            className={`px-4 py-2 rounded-xl transition-all duration-500 font-medium ${
              !showMore 
                ? 'bg-gradient-to-r from-nebula/30 to-supernova/30 text-starlight border border-nebula/40 shadow-lg glow-purple' 
                : 'bg-starlight/10 hover:bg-starlight/20 text-muted hover:text-starlight'
            }`}
            onClick={() => setShowMore(false)}
          >
            پنل اصلی
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition-all duration-500 font-medium ${
              showMore 
                ? 'bg-gradient-to-r from-nebula to-supernova text-starlight shadow-xl glow-gold scale-105' 
                : 'bg-starlight/10 hover:bg-starlight/20 text-muted hover:text-starlight'
            }`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'بازگشت' : 'بیشتر'}
          </button>
        </div>

        {/* Navigation Items */}
        <div key={showMore ? 'more' : 'primary'} className={`relative grid grid-cols-5 gap-2 px-3 pt-2 pb-4 transition-all duration-700 ${showMore ? 'animate-slide-up' : 'animate-fade-in'}`}>
          {items.map((item, index) => {
            // Consider hash and nested paths as active when they start with the item href (for sections)
            const active = pathname === item.href || (item.href.includes('#') ? false : pathname.startsWith(item.href));
            return (
              <Link key={`${item.href}-${index}`} href={item.href} className="group">
                <div 
                  className={`flex flex-col items-center justify-center rounded-2xl px-2 py-3 transition-all duration-500 relative overflow-hidden ${
                    active 
                      ? 'bg-gradient-to-br from-nebula via-supernova to-nebula text-starlight shadow-2xl glow-purple scale-110 transform rotate-1' 
                      : 'hover:bg-starlight/15 text-starlight/90 hover:scale-105 hover:shadow-lg'
                  }`}
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  {/* Dynamic Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-starlight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-nebula/10 to-supernova/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Active State Indicators */}
                  {active && (
                    <>
                      <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-pulse"></div>
                    </>
                  )}
                  
                  {/* Icon with Enhanced Effects */}
                  <div className="relative z-10 mb-1">
                    <span className={`text-2xl group-active:scale-90 transition-transform duration-200 ${
                      active ? 'drop-shadow-lg' : ''
                    }`}>
                      {item.icon}
                    </span>
                    {active && (
                      <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Label with Better Typography */}
                  <span className={`text-[10px] leading-tight font-medium relative z-10 ${
                    active ? 'text-white drop-shadow-sm' : 'text-starlight/80'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Hover Ripple Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Enhanced Bottom Effects */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-nebula/40 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nebula/60 via-supernova/60 to-nebula/60"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-1 h-1 bg-nebula/60 rounded-full animate-pulse"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-supernova/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-supernova/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-nebula/60 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
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



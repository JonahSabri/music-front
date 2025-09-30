'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: '🏠', label: 'داشبورد', href: '/dashboard' },
  { icon: '🎵', label: 'موسیقی من', href: '/dashboard/music' },
  { icon: '📤', label: 'آپلود جدید', href: '/dashboard/upload' },
  { icon: '📊', label: 'آمار', href: '/dashboard/analytics' },
  { icon: '💰', label: 'کیف پول', href: '/dashboard/wallet' },
  { icon: '⚙️', label: 'تنظیمات', href: '/dashboard/settings' },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-void/50 backdrop-blur-xl border-l border-white/10 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-nebula flex items-center justify-center glow-purple">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient-nebula" style={{fontFamily: 'var(--font-display)'}}>
              AstroTunes
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-nebula text-white glow-purple'
                        : 'text-muted hover:bg-white/10 hover:text-starlight'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5">
            <div className="w-10 h-10 rounded-full gradient-supernova flex items-center justify-center text-xl">
              🎤
            </div>
            <div className="flex-1">
              <div className="text-starlight font-medium">علی احمدی</div>
              <div className="text-muted text-sm">هنرمند پلاس</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

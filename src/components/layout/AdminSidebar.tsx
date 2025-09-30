'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: '📊', label: 'داشبورد', href: '/admin' },
  { icon: '🎵', label: 'مدیریت آثار', href: '/admin/releases' },
  { icon: '👥', label: 'مدیریت کاربران', href: '/admin/users' },
  { icon: '💰', label: 'مدیریت مالی', href: '/admin/finance' },
  { icon: '🎫', label: 'تیکت‌های پشتیبانی', href: '/admin/support' },
  { icon: '⚙️', label: 'تنظیمات', href: '/admin/settings' },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-void/50 backdrop-blur-xl border-l border-white/10 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-supernova flex items-center justify-center glow-gold">
              <svg className="w-6 h-6 text-deep-space" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-gradient-nebula" style={{fontFamily: 'var(--font-display)'}}>
                AstroTunes
              </div>
              <div className="text-xs text-supernova">پنل مدیریت</div>
            </div>
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
                        ? 'bg-supernova text-deep-space font-bold glow-gold'
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

        {/* Admin Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5">
            <div className="w-10 h-10 rounded-full gradient-nebula flex items-center justify-center text-xl">
              👨‍💼
            </div>
            <div className="flex-1">
              <div className="text-starlight font-medium">مدیر سیستم</div>
              <div className="text-muted text-sm">admin@astrotunes.com</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

  const menuItems = [
    { icon: 'home', label: 'داشبورد', href: '/dashboard' },
    { icon: 'upload', label: 'آپلود جدید', href: '/dashboard/upload' },
    { icon: 'music', label: 'موسیقی من', href: '/dashboard/music' },
    { icon: 'analytics', label: 'آمار', href: '/dashboard/analytics' },
    { icon: 'wallet', label: 'کیف پول', href: '/dashboard/wallet' },
    { icon: 'history', label: 'تاریخچه', href: '/dashboard/wallet#transactions' },
    { icon: 'subscription', label: 'اشتراک و پرداخت', href: '/dashboard/subscription' },
    { icon: 'settings', label: 'تنظیمات', href: '/dashboard/settings' },
  ];

export const DashboardSidebar = ({ mobileOpen = false, onClose }: { mobileOpen?: boolean; onClose?: () => void; }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside className={`fixed right-0 top-0 h-screen w-72 bg-void/50 backdrop-blur-xl border-l border-white/10 z-40 ${mobileOpen ? 'block' : 'hidden'} md:block`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/20 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-8 h-8 border border-nebula/30 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-supernova/20 rounded-full"></div>
          </div>
          
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className="w-12 h-12 rounded-xl gradient-nebula flex items-center justify-center glow-purple group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
              {/* Animated Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-nebula/30 to-supernova/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-500"></div>
              
              {/* Floating Particles */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-supernova/60 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
              <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-yellow-400/80 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-nebula/60 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              
              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 animate-spin" style={{animationDuration: '8s'}}></div>
              
              {/* Musical Note Icon */}
              <svg className="w-7 h-7 text-white relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="relative">
              <span className="text-xl font-bold text-gradient-nebula group-hover:text-supernova transition-all duration-500 relative z-10" style={{fontFamily: 'var(--font-display)'}}>
                AstroTunes
              </span>
              <div className="text-xs text-muted group-hover:text-starlight transition-colors duration-500">استدیو فضایی</div>
              
              {/* Text Glow Animation */}
              <div className="absolute inset-0 text-xl font-bold opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" style={{fontFamily: 'var(--font-display)', background: 'linear-gradient(45deg, #7B2CBF, #F72585, #FFD60A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                AstroTunes
              </div>
              
              {/* Floating Text Particles */}
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-supernova/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-yellow-400/80 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '1s'}}></div>
            </div>
          </Link>
        </div>

        {/* Close button for mobile */}
        <div className="md:hidden p-2 border-b border-white/10 flex justify-end">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-starlight">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            {menuItems.map((item, index) => {
              const isActive = item.href === '/dashboard/subscription' 
                ? pathname.startsWith('/dashboard/subscription')
                : pathname === item.href;
              return (
                <li key={item.href} className="group">
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-nebula/20 to-supernova/20 text-white border border-nebula/30 glow-purple'
                        : 'text-muted hover:bg-white/10 hover:text-starlight hover:scale-105'
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {/* Background Glow Effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-nebula/10 to-supernova/10 animate-pulse"></div>
                    )}
                    
                    {/* Icon Container */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-gradient-to-br from-nebula to-supernova text-white shadow-lg' 
                        : 'bg-white/10 group-hover:bg-nebula/20 group-hover:text-nebula'
                    }`}>
                      {/* Icon Background Animation */}
                      <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Icons */}
                      <div className="relative z-10">
                        {item.icon === 'home' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                        {item.icon === 'music' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        )}
                        {item.icon === 'upload' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                        )}
                        {item.icon === 'analytics' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        )}
                {item.icon === 'wallet' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2m0-4h4v4h-4a2 2 0 01-2-2v0a2 2 0 012-2z" />
                  </svg>
                )}
                {item.icon === 'history' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                        {item.icon === 'subscription' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {item.icon === 'settings' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {/* Label */}
                    <span className="font-medium relative z-10">{item.label}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-nebula to-supernova rounded-r-full"></div>
                    )}
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/20 space-y-3">
          {/* User Info Card */}
          <div className="flex items-center space-x-3 px-4 py-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 transition-all duration-300 group relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 right-2 w-4 h-4 border border-nebula/30 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-supernova/20 rounded-full"></div>
            </div>
            
            <div className="w-12 h-12 rounded-xl gradient-supernova flex items-center justify-center text-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="text-starlight font-bold text-sm group-hover:text-supernova transition-colors">
                {user?.artist_name || user?.username || 'کاربر'}
              </div>
              <div className="text-muted text-xs truncate">{user?.email}</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">آنلاین</span>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-muted hover:bg-red-500/10 hover:text-red-400 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-red-500/20 flex items-center justify-center transition-all duration-300 relative z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="font-medium relative z-10">خروج از حساب</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

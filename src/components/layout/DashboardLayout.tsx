import { DashboardSidebar } from './DashboardSidebar';
import { MobileNav } from './MobileNav';
import { useEffect, useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // close sidebar when route changes (MobileNav handles its own state; we ensure consistency)
  useEffect(() => {
    const handler = () => setMobileOpen(false);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <div className="min-h-screen">
      <DashboardSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      
      <main className="md:mr-72 min-h-screen bg-gradient-to-br from-deep-space via-deep-space to-galaxy">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-void/50 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Hamburger - mobile only */}
              <button
                className="md:hidden mr-2 p-2 rounded-lg hover:bg-white/10 text-starlight"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <input
                type="search"
                placeholder="جستجو..."
                className="w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-nebula transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                <svg className="w-6 h-6 text-starlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 left-0 w-2 h-2 bg-supernova rounded-full"></span>
              </button>
              
              {/* Help */}
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <svg className="w-6 h-6 text-starlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>

        {/* Mobile Bottom Nav - hidden when sidebar open */}
        {!mobileOpen && <MobileNav />}
      </main>
    </div>
  );
};

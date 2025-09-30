import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen">
      <AdminSidebar />
      
      <main className="mr-64 min-h-screen bg-gradient-to-br from-deep-space via-deep-space to-galaxy">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-void/50 backdrop-blur-xl border-b border-white/10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="search"
                placeholder="جستجو..."
                className="w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-supernova transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="flex items-center space-x-4 px-4 py-2 rounded-lg bg-white/5">
                <div className="text-center">
                  <div className="text-xs text-muted">کاربران آنلاین</div>
                  <div className="text-lg font-bold text-green-400">42</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-xs text-muted">در صف بررسی</div>
                  <div className="text-lg font-bold text-yellow-400">8</div>
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                <svg className="w-6 h-6 text-starlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

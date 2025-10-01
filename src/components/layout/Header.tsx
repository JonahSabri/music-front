'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { user, authLoading } = useAuth();
  return (
    <header className="fixed top-0 w-full z-50 glass-strong border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="relative">
              <span className="text-2xl font-black text-gradient-nebula group-hover:scale-105 transition-all duration-500 relative z-10" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(123, 44, 191, 0.5)'}}>
                AstroTunes
              </span>
              
              {/* Text Glow Animation */}
              <div className="absolute inset-0 text-2xl font-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" style={{fontFamily: 'var(--font-display)', background: 'linear-gradient(45deg, #7B2CBF, #F72585, #FFD60A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                AstroTunes
              </div>
              
              {/* Floating Text Particles */}
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-supernova/60 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-yellow-400/80 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '1s'}}></div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-starlight hover:text-supernova transition-all duration-300 font-bold hover:scale-110 relative group">
              <span className="relative z-10">ویژگی‌ها</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-supernova group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#pricing" className="text-starlight hover:text-supernova transition-all duration-300 font-bold hover:scale-110 relative group">
              <span className="relative z-10">قیمت‌گذاری</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-supernova group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#help" className="text-starlight hover:text-supernova transition-all duration-300 font-bold hover:scale-110 relative group">
              <span className="relative z-10">پشتیبانی</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-supernova group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {authLoading ? (
              // Loading state
              <div className="w-20 h-10 bg-white/10 rounded-lg animate-pulse"></div>
            ) : user ? (
              // User is logged in - show dashboard button
              <Link href="/dashboard">
                <Button variant="primary" glow className="relative overflow-hidden group">
                  <span className="relative z-10">🎵 ورود به پنل</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </Link>
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:glass-strong">ورود</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" glow className="relative overflow-hidden group">
                    <span className="relative z-10">🚀 پخش جهانی موسیقی</span>
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

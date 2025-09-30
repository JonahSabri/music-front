'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-strong border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 rounded-xl gradient-nebula flex items-center justify-center glow-purple group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors"></div>
              <svg className="w-7 h-7 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-2xl font-black text-gradient-nebula group-hover:scale-105 transition-transform duration-300" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(123, 44, 191, 0.5)'}}>
              AstroTunes
            </span>
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
            <Link href="/login">
              <Button variant="ghost" className="hover:glass-strong">ورود</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" glow className="relative overflow-hidden group">
                <span className="relative z-10">🚀 پخش جهانی موسیقی</span>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

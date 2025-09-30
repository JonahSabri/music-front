'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 rounded-lg gradient-nebula flex items-center justify-center glow-purple">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <span className="text-3xl font-bold text-gradient-nebula" style={{fontFamily: 'var(--font-display)'}}>
            AstroTunes
          </span>
        </Link>

        {/* Form Card */}
        <GlassCard variant="strong" className="p-8 glow-purple animate-slide-up">
          <h1 className="text-3xl font-bold text-starlight mb-2 text-center" style={{fontFamily: 'var(--font-display)'}}>
            ورود به استودیو فضایی
          </h1>
          <p className="text-muted text-center mb-8">
            به کهکشان موسیقی خود بازگردید
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-starlight font-medium mb-2">
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50 transition-all"
                placeholder="artist@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-starlight font-medium mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-nebula focus:ring-2 focus:ring-nebula/50 transition-all"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-nebula focus:ring-nebula"
                />
                <label htmlFor="rememberMe" className="mr-2 text-muted text-sm">
                  مرا به خاطر بسپار
                </label>
              </div>
              <Link href="/forgot-password" className="text-nebula hover:text-nebula-purple-light text-sm">
                فراموشی رمز عبور؟
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-full" size="lg" glow>
              ورود
            </Button>

            {/* Google Login */}
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg bg-white text-deep-space font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              ورود با گوگل
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-muted mt-6">
            حساب کاربری ندارید؟{' '}
            <Link href="/signup" className="text-nebula hover:text-nebula-purple-light font-medium">
              ثبت نام رایگان
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

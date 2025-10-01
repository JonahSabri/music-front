import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <AnimatedBackground />
      
      <main className="min-h-screen relative overflow-hidden z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden pb-32 md:pb-20">
          {/* Animated Music Notes Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Music Notes */}
            <div className="absolute top-[15%] left-[8%] text-nebula/30 text-2xl animate-float" style={{animationDelay: '0s'}}>♪</div>
            <div className="absolute top-[25%] left-[85%] text-supernova/40 text-3xl animate-float" style={{animationDelay: '0.8s'}}>♫</div>
            <div className="absolute top-[45%] left-[12%] text-white/20 text-xl animate-float" style={{animationDelay: '1.6s'}}>♬</div>
            <div className="absolute top-[65%] left-[88%] text-nebula/25 text-2xl animate-float" style={{animationDelay: '2.4s'}}>♪</div>
            <div className="absolute top-[75%] left-[15%] text-supernova/35 text-xl animate-float" style={{animationDelay: '3.2s'}}>♫</div>
            
            {/* Sound Waves */}
            <div className="absolute top-[20%] right-[10%] flex space-x-1 space-x-reverse">
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, i) => (
                <div key={i} className="w-1 bg-nebula/30 rounded-full animate-pulse" style={{
                  height: `${height * 8}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s'
                }}></div>
              ))}
            </div>
            
            {/* Equalizer Bars */}
            <div className="absolute bottom-[30%] left-[5%] flex space-x-1 space-x-reverse">
              {[3, 6, 4, 8, 2, 7, 5, 3, 6].map((height, i) => (
                <div key={i} className="w-1 bg-supernova/25 rounded-full animate-pulse" style={{
                  height: `${height * 6}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '2s'
                }}></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-starlight drop-shadow-2xl relative" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 40px rgba(123, 44, 191, 0.5)'}}>
                <span className="relative inline-block">
                موسیقی خود را به کهکشان‌ها بفرستید
                  {/* Animated Music Note */}
                  <span className="absolute -top-4 -right-8 text-2xl animate-bounce" style={{animationDuration: '2s'}}>
                    ♪
                  </span>
                  {/* Galaxy Animation */}
                  <div className="absolute -top-2 -left-12 w-8 h-8 rounded-full bg-gradient-to-r from-nebula to-supernova animate-pulse opacity-60"></div>
                  <div className="absolute -bottom-2 -right-16 w-6 h-6 rounded-full bg-gradient-to-r from-supernova to-yellow-400 animate-ping opacity-40"></div>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
                اولین پلتفرم ایرانی پخش آثار هنری شما بصورت خودکار در اسپاتیفای، اپل موزیک، آمازون و بیش از ۱۵۰ پلتفرم دیگر
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-8 mt-8">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    ورود
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button variant="primary" size="lg" glow className="w-full">
                    رایگان شروع کنید
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-muted">با آستروتونز، دلال‌ها را خط می‌زنیم تا مسیر شما را هموارتر کنیم!</p>
            </div>

            {/* Hero Card */}
            <div className="mt-12 max-w-4xl mx-auto">
              <GlassCard variant="hover-glow" className="p-8 relative overflow-hidden" animated>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-12 h-12 border border-nebula/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-supernova/20 rounded-full"></div>
                  <div className="absolute top-1/2 right-1/4 w-8 h-8 border border-white/20 rounded-full"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full gradient-nebula flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-starlight">شروع رایگان</h2>
                  </div>
                  
                  <p className="text-muted text-lg mb-6">
                    اولین ترک خود را رایگان آپلود کنید و در بیش از ۱۵۰ پلتفرم موسیقی منتشر کنید
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-muted">آپلود رایگان</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-nebula rounded-full"></div>
                      <span className="text-muted">انتشار ۲۴ ساعته</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-supernova rounded-full"></div>
                      <span className="text-muted">درآمد ۹۶٪</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Hero Visual - 3D Platform Cards */}
            <div className="mt-16 relative animate-fade-in">
              <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] perspective-1000">
                {/* Floating Platform Cards in 3D Space */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Center Main Card - Spotify Style */}
                  <div className="absolute z-30 transform hover:scale-110 transition-all duration-500 group cursor-pointer">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 glass-strong rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center border-2 border-nebula glow-purple animate-float">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-2 md:mb-4 group-hover:rotate-12 transition-transform duration-300">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-sm sm:text-base md:text-lg">Spotify</span>
                    </div>
                  </div>

                  {/* Top Left - Apple Music */}
                  <div className="absolute -top-8 -right-16 sm:-top-12 sm:-right-20 md:-top-20 md:-right-32 z-20 transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.2s'}}>
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 glass rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center border border-white/20 hover:border-pink-500 hover:glow-purple transition-all">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.994 6.124c0-.738-.034-1.356-.099-1.857-.066-.5-.19-.977-.393-1.43a3.719 3.719 0 00-.835-1.144 3.694 3.694 0 00-1.144-.835c-.453-.203-.93-.327-1.43-.393-.5-.065-1.119-.099-1.857-.099H6.124c-.738 0-1.356.034-1.857.099-.5.066-.977.19-1.43.393a3.719 3.719 0 00-1.144.835 3.694 3.694 0 00-.835 1.144c-.203.453-.327.93-.393 1.43C.4 4.768.366 5.386.366 6.124v11.752c0 .738.034 1.356.099 1.857.066.5.19.977.393 1.43.203.453.5.834.835 1.144.31.31.69.632 1.144.835.453.203.93.327 1.43.393.5.065 1.119.099 1.857.099h11.752c.738 0 1.356-.034 1.857-.099.5-.066.977-.19 1.43-.393a3.719 3.719 0 001.144-.835c.31-.31.632-.69.835-1.144.203-.453.327-.93.393-1.43.065-.5.099-1.119.099-1.857V6.124zM9.857 17.834c-1.14 0-2.064-.925-2.064-2.064V8.463c0-.285.214-.5.5-.5s.5.215.5.5v7.307c0 .57.464 1.064 1.064 1.064.57 0 1.064-.495 1.064-1.064V6.393c0-.285.214-.5.5-.5s.5.215.5.5v9.377c0 1.14-.925 2.064-2.064 2.064zm7.5-2.064c0 1.14-.925 2.064-2.064 2.064s-2.064-.925-2.064-2.064V8.463c0-.285.214-.5.5-.5s.5.215.5.5v7.307c0 .57.464 1.064 1.064 1.064.57 0 1.064-.495 1.064-1.064V6.393c0-.285.214-.5.5-.5s.5.215.5.5v9.377z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-sm sm:text-base md:text-lg">Apple Music</span>
                    </div>
                  </div>

                  {/* Bottom Right - YouTube Music */}
                  <div className="absolute -bottom-8 -left-16 sm:-bottom-12 sm:-left-20 md:-bottom-16 md:-left-28 z-20 transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.4s'}}>
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 glass rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center border border-white/20 hover:border-red-500 hover:glow-gold transition-all">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm4.8 12.96l-6.6 3.84c-.36.21-.81-.06-.81-.48V7.68c0-.42.45-.69.81-.48l6.6 3.84c.36.21.36.75 0 .96z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-sm sm:text-base md:text-lg">YouTube Music</span>
                    </div>
                  </div>

                  {/* Top Right - Amazon Music */}
                  <div className="absolute -top-6 left-20 sm:-top-8 sm:left-28 md:-top-12 md:left-40 z-10 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.6s'}}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 glass rounded-xl p-2 sm:p-2 md:p-3 flex flex-col items-center justify-center border border-white/20 hover:border-blue-500 transition-all">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21.986 11.197c1.483.74 1.483 2.466 0 3.206l-8.99 4.495c-1.484.742-3.002-.185-3.002-1.603V7.305c0-1.418 1.518-2.345 3.002-1.603l8.99 4.495z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[10px] sm:text-xs">Amazon</span>
                    </div>
                  </div>

                  {/* Bottom Left - Deezer */}
                  <div className="absolute bottom-4 right-24 sm:bottom-6 sm:right-32 md:bottom-8 md:right-44 z-10 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.8s'}}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 glass rounded-xl p-2 sm:p-2 md:p-3 flex flex-col items-center justify-center border border-white/20 hover:border-orange-500 transition-all">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.81 5.22h3.47v13.56h-3.47V5.22zm-6.36 4.54h3.47v9.02h-3.47V9.76zM6.09 12.9h3.47v5.88H6.09V12.9zm-4.36 2.7h3.47v3.18H1.73v-3.18z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[10px] sm:text-xs">Deezer</span>
                    </div>
                  </div>

                  {/* Additional Platforms */}
                  
                  {/* SoundCloud */}
                  <div className="absolute top-16 left-10 sm:top-20 sm:left-14 md:top-32 md:left-20 z-15 transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '1s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-orange-500 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">SoundCloud</span>
                    </div>
                  </div>

                  {/* Tidal */}
                  <div className="absolute bottom-10 left-10 sm:bottom-14 sm:left-14 md:bottom-20 md:left-20 z-15 transform -rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '1.2s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-blue-500 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">Tidal</span>
                    </div>
                  </div>

                  {/* Pandora */}
                  <div className="absolute top-20 right-10 sm:top-28 sm:right-14 md:top-40 md:right-20 z-15 transform -rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '1.4s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-purple-500 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">Pandora</span>
                    </div>
                  </div>

                  {/* Shazam */}
                  <div className="absolute bottom-16 right-10 sm:bottom-20 sm:right-14 md:bottom-32 md:right-20 z-15 transform rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '1.6s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-yellow-500 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">Shazam</span>
                    </div>
                  </div>

                  {/* Anghami */}
                  <div className="absolute top-8 left-20 sm:top-12 sm:left-28 md:top-16 md:left-40 z-15 transform rotate-4 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '1.8s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-red-500 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">Anghami</span>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="absolute bottom-8 left-20 sm:bottom-12 sm:left-28 md:bottom-16 md:left-40 z-15 transform -rotate-4 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '2s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-gray-800 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">TikTok</span>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="absolute top-12 right-20 sm:top-16 sm:right-28 md:top-24 md:right-40 z-15 transform -rotate-1 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '2.2s'}}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 glass rounded-lg p-1 sm:p-1 md:p-2 flex flex-col items-center justify-center border border-white/20 hover:border-pink-500 transition-all">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-[9px] sm:text-[10px] md:text-xs">Instagram</span>
                    </div>
                  </div>

                </div>

                {/* Background Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-nebula/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-supernova/20 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Glass Container */}
              <div className="mt-16 max-w-6xl mx-auto">
                <GlassCard variant="hover-glow" className="p-8 relative overflow-hidden" animated>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-8 right-8 w-16 h-16 border border-nebula/30 rounded-full"></div>
                    <div className="absolute bottom-8 left-8 w-8 h-8 bg-supernova/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
                    <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-nebula/15 rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-bold text-starlight mb-4">چرا AstroTunes؟</h3>
                    <p className="text-muted text-lg mb-6 max-w-3xl mx-auto">
                      اولین پلتفرم ایرانی که موسیقی شما را به صورت خودکار در بیش از ۱۵۰ پلتفرم جهانی منتشر می‌کند. 
                      بدون نیاز به کارت اعتباری، بدون محدودیت جغرافیایی، با پشتیبانی کامل فارسی.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-nebula flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="text-starlight font-bold mb-2">انتشار سریع</h4>
                        <p className="text-muted text-sm">فقط ۲۴ ساعت تا انتشار در همه پلتفرم‌ها</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-supernova flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <h4 className="text-starlight font-bold mb-2">درآمد بالا</h4>
                        <p className="text-muted text-sm">۹۶٪ درآمد برای شما، فقط ۴٪ کارمزد</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-starlight font-bold mb-2">پشتیبانی کامل</h4>
                        <p className="text-muted text-sm">پشتیبانی ۲۴/۷ به زبان فارسی</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Stats Row Below */}
              <div className="mt-24 grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { 
                    icon: (
                      <div className="relative">
                        <svg className="w-12 h-12 text-nebula" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-supernova rounded-full flex items-center justify-center">
                          <span className="text-xs text-deep-space font-bold">+</span>
                        </div>
                      </div>
                    ), 
                    number: '150+', 
                    label: 'پلتفرم موسیقی',
                    color: 'from-nebula to-nebula-purple-light'
                  },
                  { 
                    icon: (
                      <div className="relative">
                        <svg className="w-12 h-12 text-supernova" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <div className="absolute -bottom-1 -right-1 w-6 h-3 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">96%</span>
                        </div>
                      </div>
                    ), 
                    number: '96%', 
                    label: 'درآمد برای شما (فی برداشت 4%)',
                    color: 'from-supernova to-yellow-400'
                  },
                  { 
                    icon: (
                      <div className="relative">
                        <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                        </svg>
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    ), 
                    number: '24h', 
                    label: 'انتشار سریع',
                    color: 'from-green-400 to-green-600'
                  }
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-2xl p-6 text-center hover:glass-strong hover:scale-105 transition-all duration-300 group animate-slide-up relative overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="mb-3 group-hover:scale-125 transition-transform duration-300 flex justify-center">
                        {stat.icon}
                      </div>
                    <div className="text-3xl font-black text-gradient-nebula mb-2">{stat.number}</div>
                    <div className="text-muted font-medium">{stat.label}</div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-nebula/30 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4 relative">
          <div className="container mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-starlight animate-slide-up" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 30px rgba(224, 225, 221, 0.3)'}}>
              چگونه کار می‌کند؟
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { 
                  icon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  ), 
                  title: 'آپلود', 
                  desc: 'موسیقی و طرح جلد خود را آپلود کنید', 
                  delay: '0s',
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  icon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.55,4.22 19.78,4.22C19.78,6.45 17.59,12.61 13.21,15.83L12.71,18.36L9.88,21.19C9.5,21.57 8.91,21.57 8.53,21.19L2.81,15.5C2.43,15.12 2.43,14.5 2.81,14.12Z"/>
                    </svg>
                  ), 
                  title: 'ارسال', 
                  desc: 'ما اثر شما را به تمام پلتفرم‌ها ارسال می‌کنیم', 
                  delay: '0.1s',
                  color: 'from-purple-500 to-purple-600'
                },
                { 
                  icon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,3V13.55C11.41,13.21 10.73,13 10,13A4,4 0 0,0 6,17A4,4 0 0,0 10,21A4,4 0 0,0 14,17V7H18V3H12Z"/>
                    </svg>
                  ), 
                  title: 'پخش', 
                  desc: 'میلیون‌ها نفر موسیقی شما را می‌شنوند', 
                  delay: '0.2s',
                  color: 'from-green-500 to-green-600'
                },
                { 
                  icon: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                    </svg>
                  ), 
                  title: 'درآمد', 
                  desc: '۹۶٪ درآمد حاصل از فروش را دریافت کنید (فی برداشت 4%)', 
                  delay: '0.3s',
                  color: 'from-yellow-500 to-yellow-600'
                }
              ].map((step, index) => (
                <div key={index} className="text-center group animate-slide-up relative" style={{animationDelay: step.delay}}>
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-nebula/50 to-transparent transform translate-x-6"></div>
                  )}
                  
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white glow-purple group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                    {/* Animated Background */}
                    <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 group-hover:rotate-12 transition-transform duration-300">
                      {step.icon}
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-supernova rounded-full flex items-center justify-center text-deep-space font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-starlight mb-2 group-hover:text-supernova transition-colors">{step.title}</h3>
                  <p className="text-muted group-hover:text-starlight transition-colors">{step.desc}</p>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nebula/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Platforms */}
        <section id="platforms" className="py-20 px-4 relative">
          <div className="absolute inset-0 glass opacity-50"></div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-starlight animate-slide-up" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 30px rgba(224, 225, 221, 0.3)'}}>
              پلتفرم‌های تحت پوشش
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { 
                  name: 'Spotify', 
                  color: 'from-green-400 to-green-600', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Apple Music', 
                  color: 'from-pink-500 to-red-500', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.994 6.124c0-.738-.034-1.356-.099-1.857-.066-.5-.19-.977-.393-1.43a3.719 3.719 0 00-.835-1.144 3.694 3.694 0 00-1.144-.835c-.453-.203-.93-.327-1.43-.393-.5-.065-1.119-.099-1.857-.099H6.124c-.738 0-1.356.034-1.857.099-.5.066-.977.19-1.43.393a3.719 3.719 0 00-1.144.835 3.694 3.694 0 00-.835 1.144c-.203.453-.327.93-.393 1.43C.4 4.768.366 5.386.366 6.124v11.752c0 .738.034 1.356.099 1.857.066.5.19.977.393 1.43.203.453.5.834.835 1.144.31.31.69.632 1.144.835.453.203.93.327 1.43.393.5.065 1.119.099 1.857.099h11.752c.738 0 1.356-.034 1.857-.099.5-.066.977-.19 1.43-.393a3.719 3.719 0 001.144-.835c.31-.31.632-.69.835-1.144.203-.453.327-.93.393-1.43.065-.5.099-1.119.099-1.857V6.124zM9.857 17.834c-1.14 0-2.064-.925-2.064-2.064V8.463c0-.285.214-.5.5-.5s.5.215.5.5v7.307c0 .57.464 1.064 1.064 1.064.57 0 1.064-.495 1.064-1.064V6.393c0-.285.214-.5.5-.5s.5.215.5.5v9.377c0 1.14-.925 2.064-2.064 2.064zm7.5-2.064c0 1.14-.925 2.064-2.064 2.064s-2.064-.925-2.064-2.064V8.463c0-.285.214-.5.5-.5s.5.215.5.5v7.307c0 .57.464 1.064 1.064 1.064.57 0 1.064-.495 1.064-1.064V6.393c0-.285.214-.5.5-.5s.5.215.5.5v9.377z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Amazon Music', 
                  color: 'from-blue-400 to-blue-600', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.986 11.197c1.483.74 1.483 2.466 0 3.206l-8.99 4.495c-1.484.742-3.002-.185-3.002-1.603V7.305c0-1.418 1.518-2.345 3.002-1.603l8.99 4.495z"/>
                      <path d="M2 16.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5-1 2.5-2.5 2.5S2 18 2 16.5z"/>
                    </svg>
                  )
                },
                { 
                  name: 'YouTube Music', 
                  color: 'from-red-500 to-red-700', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm4.8 12.96l-6.6 3.84c-.36.21-.81-.06-.81-.48V7.68c0-.42.45-.69.81-.48l6.6 3.84c.36.21.36.75 0 .96z"/>
                    </svg>
                  )
                },
                { 
                  name: 'TikTok', 
                  color: 'from-gray-800 to-black', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Instagram', 
                  color: 'from-purple-500 to-pink-500', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Deezer', 
                  color: 'from-orange-400 to-orange-600', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.81 5.22h3.47v13.56h-3.47V5.22zm-6.36 4.54h3.47v9.02h-3.47V9.76zM6.09 12.9h3.47v5.88H6.09V12.9zm-4.36 2.7h3.47v3.18H1.73v-3.18z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Tidal', 
                  color: 'from-blue-600 to-blue-800', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L0 16.004l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004 4.004-4.004-4.004-4.004zm0 8.008l-4.004 4.004-4.004-4.004 4.004-4.004 4.004 4.004z"/>
                      <path d="M16.016 7.996l4.004-4.004L24.024 7.996l-4.004 4.004-4.004-4.004z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Pandora', 
                  color: 'from-blue-500 to-purple-500', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.098 14.618c-.175.56-.735.87-1.295.695-.56-.175-.87-.735-.695-1.295.935-2.995-.35-6.215-3.345-7.15-2.995-.935-6.215.35-7.15 3.345-.175.56-.735.87-1.295.695-.56-.175-.87-.735-.695-1.295C4.013 5.703 8.168 3.623 12.078 5.013c3.91 1.39 5.99 5.545 4.6 9.455-.175.56-.175 1.05.42 1.15z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Shazam', 
                  color: 'from-blue-400 to-blue-600', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.5 2c-5.1 0-9.5 3.7-10.4 8.6-.1.5.2 1 .7 1.1.5.1 1-.2 1.1-.7.8-4.2 4.5-7.3 8.6-7.3 5.1 0 9.3 4.2 9.3 9.3 0 2.5-1 4.8-2.7 6.5-.4.4-.4 1 0 1.4.2.2.5.3.7.3.3 0 .5-.1.7-.3 2.1-2.1 3.3-4.9 3.3-7.9 0-6.1-4.9-11-11-11zm-.5 17c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm4.7-7.3c-.4-.4-1-.4-1.4 0l-3.3 3.3-1.3-1.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2 2c.2.2.5.3.7.3.3 0 .5-.1.7-.3l4-4c.4-.4.4-1 0-1.4z"/>
                    </svg>
                  )
                },
                { 
                  name: 'SoundCloud', 
                  color: 'from-orange-500 to-red-500', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.051 0-.09.039-.097.087l-.17 1.316.17 1.261c.007.053.046.09.097.09.05 0 .09-.037.097-.09l.195-1.261-.195-1.316c-.007-.048-.047-.087-.097-.087m1.8-.208c-.06 0-.111.05-.118.113l-.213 1.534.213 1.464c.007.066.058.115.118.115.057 0 .106-.049.114-.115l.239-1.464-.239-1.534c-.008-.063-.057-.113-.114-.113m.899-.125c-.065 0-.116.055-.126.12l-.201 1.659.201 1.535c.01.066.061.121.126.121.066 0 .116-.055.127-.121l.221-1.535-.221-1.659c-.011-.065-.061-.12-.127-.12m.898-.058c-.07 0-.127.058-.135.129l-.18 1.717.18 1.643c.008.072.065.131.135.131.072 0 .128-.059.136-.131l.201-1.643-.201-1.717c-.008-.071-.064-.129-.136-.129m.896.022c-.077 0-.138.063-.144.14l-.167 1.695.167 1.62c.006.077.067.142.144.142.074 0 .134-.065.142-.142l.185-1.62-.185-1.695c-.008-.077-.068-.14-.142-.14m.89.057c-.082 0-.147.068-.152.153l-.152 1.638.152 1.548c.005.084.07.152.152.152.08 0 .142-.068.149-.152l.169-1.548-.169-1.638c-.007-.085-.069-.153-.149-.153m.889.1c-.087 0-.156.072-.163.163l-.138 1.538.138 1.467c.007.093.076.165.163.165.086 0 .156-.072.162-.165l.153-1.467-.153-1.538c-.006-.091-.076-.163-.162-.163m.89.143c-.093 0-.167.076-.173.175l-.123 1.395.123 1.38c.006.1.08.176.173.176.091 0 .164-.076.17-.176l.136-1.38-.136-1.395c-.006-.099-.079-.175-.17-.175m.898.207c-.097 0-.176.082-.183.181l-.105 1.188.105 1.305c.007.1.086.182.183.182.095 0 .173-.082.18-.182l.117-1.305-.117-1.188c-.007-.099-.085-.181-.18-.181m12.943 1.95c-.413 0-.811.086-1.175.253-.37-2.554-2.49-4.515-5.095-4.515-1.037 0-2.025.316-2.857.879-.093.068-.114.137-.114.21v8.872c0 .106.084.188.186.196h9.055c1.622 0 2.934-1.313 2.934-2.934s-1.312-2.935-2.934-2.935"/>
                    </svg>
                  )
                },
                { 
                  name: 'Anghami', 
                  color: 'from-purple-500 to-pink-500', 
                  logo: (
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2-8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
                    </svg>
                  )
                }
              ].map((platform, index) => (
                <div 
                  key={index} 
                  className="glass rounded-xl p-6 flex flex-col items-center justify-center hover:glass-strong hover:scale-110 hover:glow-purple transition-all duration-500 group cursor-pointer relative overflow-hidden animate-fade-in" 
                  style={{animationDelay: `${index * 0.08}s`}}
                >
                  {/* Background Gradient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                  
                  {/* Spinning Ring Effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-nebula/40 group-hover:rotate-180 transition-all duration-1000"></div>
                  
                  {/* Platform Logo with Animation */}
                  <div className={`relative mb-3 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter group-hover:drop-shadow-[0_0_15px_rgba(123,44,191,0.8)]`}>
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-nebula to-supernova opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700 blur-xl"></div>
                    
                    {/* Logo */}
                    <div className="relative z-10 group-hover:animate-bounce">
                      {platform.logo}
                    </div>
                  </div>
                  
                  {/* Platform Name */}
                  <span className="text-starlight font-bold group-hover:text-supernova transition-all duration-300 text-sm text-center relative z-10 group-hover:scale-110">
                    {platform.name}
                  </span>
                  
                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-nebula/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(123,44,191,0.5)]"></div>
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-supernova rounded-full animate-ping"></div>
                    <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-nebula rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-supernova rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
                  </div>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional Platforms Badge */}
            <div className="mt-12 text-center animate-fade-in">
              <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 hover:glass-strong hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-deep-space flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform">+</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-deep-space flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform" style={{transitionDelay: '0.1s'}}>۱</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-deep-space flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform" style={{transitionDelay: '0.2s'}}>۵</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-deep-space flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform" style={{transitionDelay: '0.3s'}}>۰</div>
                </div>
                <span className="text-starlight font-bold text-lg group-hover:text-supernova transition-colors">
                  و بیش از ۱۵۰ پلتفرم دیگر
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-starlight" style={{fontFamily: 'var(--font-display)'}}>
              ویژگی‌های حرفه‌ای
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                    </svg>
                  ), 
                  title: 'آپلود نامحدود', 
                  desc: 'هیچ محدودیتی در تعداد آهنگ‌های منتشر شده ندارید',
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                    </svg>
                  ), 
                  title: 'حفظ ۹۶٪ درآمد', 
                  desc: 'فی برداشت فقط 4% - کمتر از هر پلتفرم ایرانی و خارجی',
                  color: 'from-green-500 to-green-600'
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13,3c-4.97,0-9,4.03-9,9H1l3.89,3.89.07.14L9,12H6c0-3.87,3.13-7,7-7s7,3.13,7,7-3.13,7-7,7c-1.93,0-3.68-.79-4.94-2.06l-1.42,1.42C8.27,19.99,10.51,21,13,21c4.97,0,9-4.03,9-9s-4.03-9-9-9zm-1,5v5l4.28,2.54.72-1.21-3.5-2.08V8H12z"/>
                    </svg>
                  ), 
                  title: 'تحویل سریع', 
                  desc: 'آثار شما در کمتر از 24 ساعت منتشر می‌شوند',
                  color: 'from-yellow-500 to-orange-500'
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z"/>
                    </svg>
                  ), 
                  title: 'آمار دقیق', 
                  desc: 'داشبورد پیشرفته با گزارش‌های تحلیلی کامل',
                  color: 'from-purple-500 to-purple-600'
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                    </svg>
                  ), 
                  title: 'لینک‌های هوشمند Pre-Save', 
                  desc: 'افزایش استریم با صفحات Pre-Save حرفه‌ای',
                  color: 'from-pink-500 to-pink-600'
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                    </svg>
                  ), 
                  title: 'پشتیبانی 24/7', 
                  desc: 'تیم پشتیبانی همیشه در کنار شماست',
                  color: 'from-indigo-500 to-indigo-600'
                }
              ].map((feature, index) => (
                <GlassCard key={index} variant="hover-glow" className="p-6 group relative overflow-hidden" animated>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-8 h-8 border border-nebula/30 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 bg-supernova/20 rounded-full"></div>
                  </div>
                  
                  <div className={`w-16 h-16 mb-4 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden`}>
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    <div className="relative z-10">
                    {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-starlight mb-2 group-hover:text-supernova transition-colors">{feature.title}</h3>
                  <p className="text-muted group-hover:text-starlight transition-colors">{feature.desc}</p>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nebula/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-4 bg-white/5">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-starlight" style={{fontFamily: 'var(--font-display)'}}>
              قیمت‌گذاری شفاف
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { 
                  name: 'رایگان', 
                  price: '۰', 
                  period: 'برای همیشه',
                  features: [
                    'یک ترک رایگان',
                    'انتشار در همه پلتفرم‌های موسیقی',
                    'صد درصد درآمد برای شما',
                    'آمار و گزارش پایه',
                    'پشتیبانی ایمیل',
                    'داشبورد ساده',
                    'آپلود تا 100MB',
                    'فرمت‌های MP3 و WAV'
                  ],
                  popular: false,
                  color: 'from-gray-500 to-gray-700'
                },
                { 
                  name: 'حرفه‌ای', 
                  price: '۵,۳۰۰,۰۰۰', 
                  originalPrice: '۶,۲۰۰,۰۰۰',
                  period: 'سالانه',
                  features: [
                    'آپلود نامحدود آهنگ و آلبوم',
                    'صد درصد درآمد برای شما (فی برداشت 4%)',
                    'لینک‌های پیش ذخیره (Pre-Save) حرفه‌ای',
                    'شناسایی محتوای یوتیوب (Content ID)',
                    'تقسیم درآمد بین همکاران (Splits)',
                    'آمار و تحلیل پیشرفته با نمودارهای تعاملی',
                    'یکپارچگی با Shazam و Siri',
                    'بهینه‌ساز فروشگاه (Store Maximizer)',
                    'پشتیبانی ۲۴ ساعته و ۷ روزه',
                    'داشبورد مدیریت حرفه‌ای',
                    'گزارش‌های مالی ماهانه و سالانه',
                    'ابزارهای بازاریابی و تبلیغات',
                    'پشتیبانی از فرمت‌های مختلف صوتی',
                    'مدیریت کپی‌رایت و حقوق معنوی',
                    'هماهنگی با شبکه‌های اجتماعی',
                    'ابزارهای تحلیل رقبا',
                    'پیشنهادات هوشمند برای بهبود فروش',
                    'پشتیبانی از NFT و متاورس'
                  ],
                  popular: true,
                  color: 'from-nebula to-nebula-purple-light'
                }
              ].map((plan, index) => (
                <GlassCard key={index} variant={plan.popular ? 'hover-glow' : 'default'} className={`relative p-8 ${plan.popular ? 'glow-purple scale-105' : ''}`} animated>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-supernova text-deep-space px-4 py-1 rounded-full text-sm font-bold animate-glow-pulse">
                      محبوب‌ترین 🔥
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 mx-auto`}>
                    <span className="text-3xl">{index === 0 ? '🎁' : index === 1 ? '⭐' : '👑'}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-starlight mb-2 text-center">{plan.name}</h3>
                  <div className="mb-6 text-center">
                    {plan.originalPrice && (
                      <div className="text-lg text-muted line-through mb-1">
                        {plan.originalPrice} تومان
                      </div>
                    )}
                    <span className="text-4xl font-black text-gradient-nebula">{plan.price}</span>
                    <span className="text-muted text-lg"> تومان</span>
                    {plan.originalPrice && (
                      <div className="text-sm text-green-400 font-bold mt-1">
                        {Math.round(((parseInt(plan.originalPrice.replace(/,/g, '')) - parseInt(plan.price.replace(/,/g, ''))) / parseInt(plan.originalPrice.replace(/,/g, '')) * 100))}% تخفیف
                      </div>
                    )}
                    <div className="text-sm text-muted mt-1">{plan.period}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-supernova mt-0.5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-muted">{feature}</span>
          </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full" 
                    glow={plan.popular}
                  >
                    انتخاب پلن
                  </Button>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-starlight" style={{fontFamily: 'var(--font-display)'}}>
              نظر هنرمندان
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'علی احمدی', role: 'خواننده پاپ', quote: 'AstroTunes تجربه انتشار موسیقی را کاملاً متحول کرد. سریع، حرفه‌ای و بدون دردسر!', avatar: '🎤' },
                { name: 'سارا کریمی', role: 'آهنگساز', quote: 'داشبورد آماری عالی و پشتیبانی فوق‌العاده. من تمام آثارم را از طریق AstroTunes منتشر می‌کنم.', avatar: '🎹' },
                { name: 'رضا محمدی', role: 'پرودیوسر', quote: 'درآمد ۱۰۰٪ و بدون کمیسیون! این همان چیزی بود که همیشه دنبالش بودم.', avatar: '🎧' }
              ].map((testimonial, index) => (
                <GlassCard key={index} className="p-6" variant="hover-glow" animated>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full gradient-nebula flex items-center justify-center text-2xl ml-4 animate-float">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-starlight font-bold">{testimonial.name}</h4>
                      <p className="text-muted text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted italic">"{testimonial.quote}"</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-white/5">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-starlight" style={{fontFamily: 'var(--font-display)'}}>
              سوالات متداول
            </h2>
            
            <div className="space-y-4">
              {[
                { q: 'آیا واقعاً ۹۶٪ درآمد را دریافت می‌کنم؟', a: 'بله! شما ۹۶٪ درآمد حاصل از استریم و فروش را دریافت می‌کنید. فی برداشت فقط 4% است که کمتر از هر پلتفرم ایرانی و خارجی است.' },
                { q: 'چقدر زمان می‌برد تا موسیقی من منتشر شود؟', a: 'معمولاً در کمتر از 24 ساعت، اثر شما در تمام پلتفرم‌ها منتشر می‌شود. برخی پلتفرم‌ها ممکن است تا 7 روز زمان ببرند.' },
                { q: 'آیا می‌توانم موسیقی خود را بعداً حذف کنم؟', a: 'بله، شما می‌توانید هر زمان که بخواهید آثار خود را از پلتفرم‌ها حذف کنید.' },
                { q: 'آیا نیاز به کپی‌رایت دارم؟', a: 'کپی‌رایت به صورت خودکار به محض خلق اثر برای شما ایجاد می‌شود. اما توصیه می‌کنیم آثار مهم را در سازمان کپی‌رایت ثبت کنید.' }
              ].map((faq, index) => (
                <details key={index} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 group">
                  <summary className="text-starlight font-bold cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <svg className="w-5 h-5 text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-muted mt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <GlassCard variant="hover-glow" className="max-w-3xl mx-auto gradient-cosmic p-12" animated>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-starlight animate-slide-up" style={{fontFamily: 'var(--font-display)'}}>
                آماده پرواز در کهکشان موسیقی؟
              </h2>
              <p className="text-xl text-muted mb-8 animate-fade-in">
                همین حالا به هزاران هنرمند حرفه‌ای بپیوندید
              </p>
              <Link href="/signup">
                <Button variant="primary" size="lg" glow className="text-lg">
                  🚀 شروع رایگان
                </Button>
              </Link>
            </GlassCard>
        </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
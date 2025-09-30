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
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          {/* Animated Stars Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-1 h-1 bg-white rounded-full top-[20%] left-[10%] animate-pulse"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full top-[40%] left-[80%] animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute w-1 h-1 bg-supernova rounded-full top-[60%] left-[30%] animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute w-2 h-2 bg-white rounded-full top-[80%] left-[60%] animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute w-1 h-1 bg-nebula rounded-full top-[30%] left-[90%] animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-gradient-nebula drop-shadow-2xl" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 40px rgba(123, 44, 191, 0.5)'}}>
                موسیقی خود را به کهکشان‌ها بفرستید
              </h1>
              <p className="text-xl md:text-2xl text-muted mb-8 leading-relaxed">
                آثار خود را در اسپاتیفای، اپل موزیک، آمازون و بیش از ۱۵۰ پلتفرم دیگر منتشر کنید و ۱۰۰٪ درآمد آن را برای خود نگه دارید
              </p>
              
              {/* Quick Signup Form */}
              <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-8">
                <input 
                  type="email" 
                  placeholder="ایمیل شما" 
                  className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-starlight placeholder-muted focus:outline-none focus:border-nebula transition-colors"
                />
                <Link href="/signup">
                  <Button variant="primary" size="lg" glow>
                    رایگان شروع کنید
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-muted">بدون نیاز به کارت اعتباری • فقط 3 دقیقه زمان می‌برد</p>
            </div>

            {/* Hero Visual - 3D Platform Cards */}
            <div className="mt-16 relative animate-fade-in">
              <div className="relative w-full max-w-6xl mx-auto h-[500px] perspective-1000">
                {/* Floating Platform Cards in 3D Space */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Center Main Card - Spotify Style */}
                  <div className="absolute z-30 transform hover:scale-110 transition-all duration-500 group cursor-pointer">
                    <div className="w-48 h-48 md:w-64 md:h-64 glass-strong rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-nebula glow-purple animate-float">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-lg">Spotify</span>
                    </div>
                  </div>

                  {/* Top Left - Apple Music */}
                  <div className="absolute -top-20 -right-32 z-20 transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.2s'}}>
                    <div className="w-40 h-40 glass rounded-2xl p-4 flex flex-col items-center justify-center border border-white/20 hover:border-pink-500 hover:glow-purple transition-all">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.994 6.124c0-.738-.034-1.356-.099-1.857-.066-.5-.19-.977-.393-1.43a3.719 3.719 0 00-.835-1.144 3.694 3.694 0 00-1.144-.835c-.453-.203-.93-.327-1.43-.393-.5-.065-1.119-.099-1.857-.099H6.124c-.738 0-1.356.034-1.857.099-.5.066-.977.19-1.43.393a3.719 3.719 0 00-1.144.835 3.694 3.694 0 00-.835 1.144c-.203.453-.327.93-.393 1.43C.4 4.768.366 5.386.366 6.124v11.752c0 .738.034 1.356.099 1.857.066.5.19.977.393 1.43.203.453.5.834.835 1.144.31.31.69.632 1.144.835.453.203.93.327 1.43.393.5.065 1.119.099 1.857.099h11.752c.738 0 1.356-.034 1.857-.099.5-.066.977-.19 1.43-.393a3.719 3.719 0 001.144-.835c.31-.31.632-.69.835-1.144.203-.453.327-.93.393-1.43.065-.5.099-1.119.099-1.857V6.124zM9.857 17.834c-1.14 0-2.064-.925-2.064-2.064V8.463c0-.285.214-.5.5-.5s.5.215.5.5v7.307c0 .57.464 1.064 1.064 1.064.57 0 1.064-.495 1.064-1.064V6.393c0-.285.214-.5.5-.5s.5.215.5.5v9.377c0 1.14-.925 2.064-2.064 2.064zm7.5-2.064c0 1.14-.925 2.064-2.064 2.064s-2.064-.925-2.064-2.064V8.463c0-.285.214-.5.5-.5s.5.215.5.5v7.307c0 .57.464 1.064 1.064 1.064.57 0 1.064-.495 1.064-1.064V6.393c0-.285.214-.5.5-.5s.5.215.5.5v9.377z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-sm">Apple Music</span>
                    </div>
                  </div>

                  {/* Bottom Right - YouTube Music */}
                  <div className="absolute -bottom-16 -left-28 z-20 transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.4s'}}>
                    <div className="w-40 h-40 glass rounded-2xl p-4 flex flex-col items-center justify-center border border-white/20 hover:border-red-500 hover:glow-gold transition-all">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm4.8 12.96l-6.6 3.84c-.36.21-.81-.06-.81-.48V7.68c0-.42.45-.69.81-.48l6.6 3.84c.36.21.36.75 0 .96z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-sm">YouTube Music</span>
                    </div>
                  </div>

                  {/* Top Right - Amazon Music */}
                  <div className="absolute -top-12 left-40 z-10 transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.6s'}}>
                    <div className="w-32 h-32 glass rounded-xl p-3 flex flex-col items-center justify-center border border-white/20 hover:border-blue-500 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21.986 11.197c1.483.74 1.483 2.466 0 3.206l-8.99 4.495c-1.484.742-3.002-.185-3.002-1.603V7.305c0-1.418 1.518-2.345 3.002-1.603l8.99 4.495z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-xs">Amazon</span>
                    </div>
                  </div>

                  {/* Bottom Left - Deezer */}
                  <div className="absolute bottom-8 right-44 z-10 transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-500 group cursor-pointer animate-float" style={{animationDelay: '0.8s'}}>
                    <div className="w-32 h-32 glass rounded-xl p-3 flex flex-col items-center justify-center border border-white/20 hover:border-orange-500 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.81 5.22h3.47v13.56h-3.47V5.22zm-6.36 4.54h3.47v9.02h-3.47V9.76zM6.09 12.9h3.47v5.88H6.09V12.9zm-4.36 2.7h3.47v3.18H1.73v-3.18z"/>
                        </svg>
                      </div>
                      <span className="text-starlight font-bold text-xs">Deezer</span>
                    </div>
                  </div>

                  {/* Animated Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    <line x1="50%" y1="50%" x2="30%" y2="20%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse"/>
                    <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                    <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1s'}}/>
                    <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b2cbf" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#ffd60a" stopOpacity="0.8"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Background Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-nebula/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-supernova/20 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Stats Row Below */}
              <div className="mt-24 grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: '🎵', number: '150+', label: 'پلتفرم موسیقی' },
                  { icon: '💯', number: '100%', label: 'درآمد برای شما' },
                  { icon: '⚡', number: '48h', label: 'انتشار سریع' }
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-2xl p-6 text-center hover:glass-strong hover:scale-105 transition-all duration-300 group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                    <div className="text-3xl font-black text-gradient-nebula mb-2">{stat.number}</div>
                    <div className="text-muted font-medium">{stat.label}</div>
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
                { icon: '📤', title: 'آپلود', desc: 'موسیقی و طرح جلد خود را آپلود کنید', delay: '0s' },
                { icon: '🚀', title: 'ارسال', desc: 'ما اثر شما را به تمام پلتفرم‌ها ارسال می‌کنیم', delay: '0.1s' },
                { icon: '🎧', title: 'پخش', desc: 'میلیون‌ها نفر موسیقی شما را می‌شنوند', delay: '0.2s' },
                { icon: '💰', title: 'درآمد', desc: '۱۰۰٪ درآمد حاصل از فروش را دریافت کنید', delay: '0.3s' }
              ].map((step, index) => (
                <div key={index} className="text-center group animate-slide-up" style={{animationDelay: step.delay}}>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full gradient-nebula flex items-center justify-center text-5xl glow-purple group-hover:scale-110 transition-transform duration-300 relative">
                    <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
                    <span className="relative z-10">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-starlight mb-2">{step.title}</h3>
                  <p className="text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Platforms */}
        <section id="platforms" className="py-20 px-4 relative">
          <div className="absolute inset-0 glass opacity-50"></div>
          <div className="container mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-starlight" style={{fontFamily: 'var(--font-display)', textShadow: '0 0 30px rgba(224, 225, 221, 0.3)'}}>
              پلتفرم‌های تحت پوشش
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {['Spotify', 'Apple Music', 'Amazon Music', 'YouTube Music', 'TikTok', 'Instagram', 'Deezer', 'Tidal', 'Pandora', 'Shazam', 'SoundCloud', 'Anghami'].map((platform, index) => (
                <div key={index} className="glass rounded-xl p-6 flex items-center justify-center hover:glass-strong hover:scale-105 hover:glow-purple transition-all duration-300 group cursor-pointer" style={{animationDelay: `${index * 0.05}s`}}>
                  <span className="text-starlight font-bold group-hover:text-supernova transition-all">{platform}</span>
                </div>
              ))}
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
                { icon: '∞', title: 'آپلود نامحدود', desc: 'هیچ محدودیتی در تعداد آهنگ‌های منتشر شده ندارید' },
                { icon: '💯', title: 'حفظ ۱۰۰٪ درآمد', desc: 'تمام درآمدهای خود را بدون کسر کمیسیون دریافت کنید' },
                { icon: '⚡', title: 'تحویل سریع', desc: 'آثار شما در کمتر از 48 ساعت منتشر می‌شوند' },
                { icon: '📊', title: 'آمار دقیق', desc: 'داشبورد پیشرفته با گزارش‌های تحلیلی کامل' },
                { icon: '⭐', title: 'لینک‌های هوشمند Pre-Save', desc: 'افزایش استریم با صفحات Pre-Save حرفه‌ای' },
                { icon: '🎧', title: 'پشتیبانی 24/7', desc: 'تیم پشتیبانی همیشه در کنار شماست' }
              ].map((feature, index) => (
                <GlassCard key={index} variant="hover-glow" className="p-6 group" animated>
                  <div className="w-16 h-16 mb-4 rounded-lg gradient-nebula flex items-center justify-center text-3xl group-hover:glow-purple transition-all animate-float">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-starlight mb-2">{feature.title}</h3>
                  <p className="text-muted">{feature.desc}</p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { 
                  name: 'رایگان', 
                  price: '۰', 
                  period: 'برای همیشه',
                  features: ['۱ ترک رایگان', 'انتشار در همه پلتفرم‌ها', '۱۰۰٪ درآمد', 'آمار پایه'],
                  popular: false,
                  color: 'from-gray-500 to-gray-700'
                },
                { 
                  name: 'حرفه‌ای', 
                  price: '۵۹,۹۰۰', 
                  period: 'سالانه',
                  features: ['آپلود نامحدود', '۱۰۰٪ درآمد', 'Pre-Save Links', 'YouTube Content ID', 'Splits', 'آمار پیشرفته', 'Shazam & Siri', 'Store Maximizer', 'پشتیبانی ۲۴/۷'],
                  popular: true,
                  color: 'from-nebula to-nebula-purple-light'
                },
                { 
                  name: 'لیبل', 
                  price: '۱۹۹,۰۰۰', 
                  period: 'سالانه',
                  features: ['همه ویژگی‌های حرفه‌ای', 'مدیریت نامحدود هنرمند', 'White Label', 'API Access', 'مدیر اختصاصی', 'گزارش‌های تخصصی', 'امکانات سفارشی'],
                  popular: false,
                  color: 'from-supernova to-yellow-600'
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
                    <span className="text-4xl font-black text-gradient-nebula">{plan.price}</span>
                    <span className="text-muted text-lg"> تومان</span>
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
                { q: 'آیا واقعاً ۱۰۰٪ درآمد را دریافت می‌کنم؟', a: 'بله! شما تمام درآمد حاصل از استریم و فروش را دریافت می‌کنید. تنها هزینه شما پرداخت سالانه پلن انتخابی است.' },
                { q: 'چقدر زمان می‌برد تا موسیقی من منتشر شود؟', a: 'معمولاً در کمتر از 48 ساعت، اثر شما در تمام پلتفرم‌ها منتشر می‌شود. برخی پلتفرم‌ها ممکن است تا 7 روز زمان ببرند.' },
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
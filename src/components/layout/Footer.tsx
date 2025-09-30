import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-void/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-nebula flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gradient-nebula" style={{fontFamily: 'var(--font-display)'}}>
                AstroTunes
              </span>
            </div>
            <p className="text-muted max-w-md">
              موسیقی خود را به کهکشان‌ها بفرستید. انتشار حرفه‌ای در بیش از ۱۵۰ پلتفرم و ۱۰۰٪ درآمد برای شما.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-starlight font-semibold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted hover:text-supernova transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-supernova transition-colors">تماس با ما</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-supernova transition-colors">قوانین و مقررات</Link></li>
              <li><Link href="/privacy" className="text-muted hover:text-supernova transition-colors">حریم خصوصی</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-starlight font-semibold mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nebula transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 text-starlight" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nebula transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 text-starlight" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-nebula transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 text-starlight" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-muted">
          <p>&copy; 2025 AstroTunes. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

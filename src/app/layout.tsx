import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/components/ui/Notification";

export const metadata: Metadata = {
  title: "AstroTunes - موسیقی خود را به کهکشان‌ها بفرستید",
  description: "انتشار حرفه‌ای موسیقی در اسپاتیفای، اپل موزیک و بیش از ۱۵۰ پلتفرم دیگر. ۱۰۰٪ درآمد برای شما.",
  keywords: "music distribution, spotify, apple music, music release, توزیع موسیقی, انتشار موسیقی",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

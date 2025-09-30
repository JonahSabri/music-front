import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AstroTunes - موسیقی خود را به کهکشان‌ها بفرستید",
  description: "انتشار حرفه‌ای موسیقی در اسپاتیفای، اپل موزیک و بیش از ۱۵۰ پلتفرم دیگر. ۱۰۰٪ درآمد برای شما.",
  keywords: "music distribution, spotify, apple music, music release, توزیع موسیقی, انتشار موسیقی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

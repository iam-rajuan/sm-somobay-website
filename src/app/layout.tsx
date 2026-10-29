import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ — S.M. Somobay Somity',
  description:
    'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত (রেজিঃ ট-ক ২৮৪০/২১) • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল। সঞ্চয় ও ঋণের পাশ বই অনলাইন পোর্টাল।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet" />
        <meta name="theme-color" content="#047857" />
      </head>
      <body suppressHydrationWarning className="antialiased flex flex-col min-h-screen text-slate-900 bg-slate-50/60 font-sans selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <main className="flex-1 min-w-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

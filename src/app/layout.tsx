import type { Metadata } from 'next';
import './globals.css';
import { cookies } from 'next/headers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import type { Language } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ — S.M. Somobay Somity',
  description:
    'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত (রেজিঃ ট-ক ২৮৪০/২১) • প্রধান কার্যালয়: এলেঙ্গা, কালিহাতী, টাঙ্গাইল। সঞ্চয় ও ঋণের পাশ বই অনলাইন পোর্টাল।',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('sm_somity_lang')?.value as Language | undefined;
  const initialLanguage: Language = cookieLang === 'en' || cookieLang === 'bn' ? cookieLang : 'bn';
  const initialTitle =
    initialLanguage === 'en'
      ? 'S.M. Khudra Sanchay O Rindan Samabay Samity Limited'
      : 'এস, এম ক্ষুদ্র সঞ্চয় ও ঋণদান সমবায় সমিতি লিঃ — S.M. Somobay Somity';

  return (
    <html lang={initialLanguage} data-lang={initialLanguage} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <title>{initialTitle}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#047857" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('sm_somity_lang');
                  if (!lang) {
                    var m = document.cookie.match(/(?:^|;\\s*)sm_somity_lang=([^;]+)/);
                    if (m) lang = m[1];
                  }
                  if (lang === 'en' || lang === 'bn') {
                    document.documentElement.lang = lang;
                    document.documentElement.setAttribute('data-lang', lang);
                    if (lang === 'en') {
                      document.title = 'S.M. Khudra Sanchay O Rindan Samabay Samity Limited';
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased flex flex-col min-h-screen text-slate-900 bg-slate-50/60 font-sans selection:bg-emerald-600 selection:text-white">
        <LanguageProvider initialLanguage={initialLanguage}>
          <Navbar />
          <main className="flex-1 min-w-0">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

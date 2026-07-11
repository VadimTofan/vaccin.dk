import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Montserrat } from 'next/font/google';
import './globals.scss';
import { Navbar } from '@/app/shared/navbar/navbar';
import { Footer } from '@/app/shared/footer/footer';
import locale from '@/app/locale.json';
import {
  LanguageProvider,
} from '@/app/hooks/localization/localization';
import { resolveLanguage } from '@/app/hooks/localization/language';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = resolveLanguage(cookieStore.get('language')?.value);

  return locale[language].metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLanguage = resolveLanguage(cookieStore.get('language')?.value);

  return (
    <html className="root" lang={initialLanguage}>
      <body className={montserrat.variable}>
        <LanguageProvider initialLanguage={initialLanguage}>
          <Navbar />
          <main className="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

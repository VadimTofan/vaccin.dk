import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.scss';
import { Navbar } from '@/app/shared/navbar/navbar';
import { Footer } from '@/app/shared/footer/footer';
import { LanguageProvider } from '@/app/hooks/localization/localization';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '900'],
});

export const metadata: Metadata = {
  title: 'Vaccin.dk | Travel vaccinations in Kastrup',
  description:
    'Travel vaccination guidance, certificates, and clinic appointments in Kastrup, Denmark.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="root" lang="da">
      <body className={montserrat.variable}>
        <LanguageProvider>
          <Navbar />
          <main className="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

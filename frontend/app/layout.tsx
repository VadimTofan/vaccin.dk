import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.scss';
import { Navbar } from '@/app/shared/navbar/navbar';
import { Footer } from '@/app/shared/footer/footer';
import { getLanguage } from '@/utils/localization';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '900'],
});

export const metadata: Metadata = {
  title: 'Welcome to Vaccin.dk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getLanguage()}>
      <body className={montserrat.variable}>
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

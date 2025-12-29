import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.scss';
import { Navbar } from '@/app/shared/navbar/navbar';
import { Footer } from '@/app/shared/footer/footer';
import { LanguageProvider } from '@/utils/localization';

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
    <html lang="en">
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

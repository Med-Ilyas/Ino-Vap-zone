import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://inovapzone.com'),
  title: {
    default: 'INO-VAP ZONE | Premium Stainless Steel Industrial Products',
    template: '%s | INO-VAP ZONE',
  },
  description:
    'SARL INO-VAP ZONE - Leading supplier of stainless steel industrial products in Algeria. Tri Clamp, SMS, DIN fittings, valves, flanges, and more for food, beverage, pharmaceutical, and chemical industries.',
  icons: {
    icon: '/images/logo/Adobe_Express_-_file.jpg',
    shortcut: '/images/logo/Adobe_Express_-_file.jpg',
    apple: '/images/logo/Adobe_Express_-_file.jpg',
  },
  keywords: [
    'stainless steel',
    'industrial products',
    'Tri Clamp',
    'SMS fittings',
    'DIN fittings',
    'BSP fittings',
    'stainless steel valves',
    'flanges',
    'pipe fittings',
    'steam equipment',
    'pressure gauges',
    'Algeria',
    'INO-VAP ZONE',
  ],
  authors: [{ name: 'SARL INO-VAP ZONE' }],
  creator: 'SARL INO-VAP ZONE',
  publisher: 'SARL INO-VAP ZONE',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://inovapzone.com',
    siteName: 'INO-VAP ZONE',
    title: 'INO-VAP ZONE | Premium Stainless Steel Industrial Products',
    description:
      'Leading supplier of stainless steel industrial products in Algeria. Premium quality fittings, valves, and equipment for industrial applications.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'INO-VAP ZONE - Stainless Steel Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INO-VAP ZONE | Premium Stainless Steel Industrial Products',
    description:
      'Leading supplier of stainless steel industrial products in Algeria.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

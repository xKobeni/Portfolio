import type { Metadata } from 'next';
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { PageTransitionProvider } from '@/components/PageTransitionContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Loader } from '@/components/Loader';
import { CustomCursor } from '@/components/CustomCursor';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { ScrollReveal } from '@/components/ScrollReveal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const baseUrl = 'https://adrianperce.dev';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Adrian Perce • Portfolio',
    template: '%s — Adrian Perce',
  },
  description:
    'Fullstack developer and freelancer building things from the database to the browser. Based in Batangas, PH.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Adrian Perce',
    title: 'Adrian Perce • Portfolio',
    description:
      'Fullstack developer and freelancer building things from the database to the browser.',
    images: [
      {
        url: '/og/default.svg',
        width: 1200,
        height: 630,
        alt: 'Adrian Perce • Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrian Perce • Portfolio',
    description:
      'Fullstack developer and freelancer building things from the database to the browser.',
    images: ['/og/default.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${ibmMono.variable}`}>
      <body>
        <ThemeProvider>
          <PageTransitionProvider>
            <Loader />
            <div className="grain" />
            <CustomCursor />
            <Header />
            <MenuOverlay />
            <ScrollReveal>
              <main>{children}</main>
            </ScrollReveal>
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

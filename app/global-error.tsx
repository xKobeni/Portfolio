'use client';

import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

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

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${ibmMono.variable}`}>
      <body>
        <section style={{ minHeight: '100svh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <span className="eyebrow">Error</span>
            <h1
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(44px, 8vw, 100px)',
                lineHeight: 1.02,
                letterSpacing: '-.02em',
                marginTop: 16,
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 17,
                lineHeight: 1.7,
                marginTop: 24,
                maxWidth: 440,
              }}
            >
              A critical error occurred. Please try again.
            </p>
            <button
              onClick={retry}
              className="back-link"
              style={{ marginTop: 40, display: 'inline-flex' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}

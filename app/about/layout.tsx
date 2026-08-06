import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Adrian Perce — Fullstack developer and freelancer based in Batangas, Philippines.',
  openGraph: {
    title: 'Adrian Perce • About',
    description: 'Fullstack developer and freelancer based in Batangas, Philippines.',
    images: [{ url: '/og/default.svg', width: 1200, height: 630, alt: 'Adrian Perce • About' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

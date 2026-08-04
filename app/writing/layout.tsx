import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Writing on development, AI, and the spaces between — by Adrian Perce.',
  openGraph: {
    title: 'Writing — Adrian Perce',
    description: 'Writing on development, AI, and the spaces between.',
    images: [{ url: '/og/writing.svg', width: 1200, height: 630, alt: 'Writing — Adrian Perce' }],
  },
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

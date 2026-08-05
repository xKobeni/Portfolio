import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Interactive demos, games, and tools — try them out.',
  openGraph: {
    title: 'Playground — Adrian Perce',
    description: 'Interactive demos, games, and tools.',
    images: [{ url: '/og/playground.svg', width: 1200, height: 630, alt: 'Playground — Adrian Perce' }],
  },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

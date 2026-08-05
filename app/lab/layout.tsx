import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Research and development — AI experiments, tools, games, and developer utilities by Adrian Perce.',
  openGraph: {
    title: 'Adrian Perce • R&D',
    description: 'AI experiments, tools, games, and developer utilities.',
    images: [{ url: '/og/lab.svg', width: 1200, height: 630, alt: 'Adrian Perce • R&D' }],
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Explorations, experiments, motion tests, and interactive prototypes by Alex Reyes.',
  openGraph: {
    title: 'Lab — Alex Reyes',
    description: 'Explorations, experiments, motion tests, and interactive prototypes.',
    images: [{ url: '/og/lab.svg', width: 1200, height: 630, alt: 'Lab — Alex Reyes' }],
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

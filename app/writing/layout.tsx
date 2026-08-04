import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Writing on design, interaction, and the spaces between — by Alex Reyes.',
  openGraph: {
    title: 'Writing — Alex Reyes',
    description: 'Writing on design, interaction, and the spaces between.',
    images: [{ url: '/og/writing.svg', width: 1200, height: 630, alt: 'Writing — Alex Reyes' }],
  },
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

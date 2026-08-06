import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectById, getPrevNextProjects } from '@/lib/projects';
import { ProjectPageClient } from './ProjectPageClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Adrian Perce`,
      description: project.overview,
      images: [
        {
          url: project.coverImage || '/og/default.svg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getPrevNextProjects(slug);

  return <ProjectPageClient project={project} prev={prev} next={next} />;
}

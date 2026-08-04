import projectsData from '@/data/projects.json';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  role: string;
  year: string;
  stack: string;
  client: string;
  tags: string;
  desc: string;
  coverGradient: string;
  coverImage?: string;
  stripGradient: string;
  stripImage?: string;
  overview: string;
  approach: string[];
  outcome: string;
}

export const getAllProjects = (): ProjectItem[] => {
  return projectsData as ProjectItem[];
};

export const getProjectById = (id: string): ProjectItem | undefined => {
  return (projectsData as ProjectItem[]).find((p) => p.id === id);
};

export const getPrevNextProjects = (
  id: string
): { prev: ProjectItem; next: ProjectItem } => {
  const projects = projectsData as ProjectItem[];
  const index = projects.findIndex((p) => p.id === id);
  const prevIndex = (index - 1 + projects.length) % projects.length;
  const nextIndex = (index + 1) % projects.length;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
};

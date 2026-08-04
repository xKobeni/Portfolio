import experimentsData from '@/data/experiments.json';

export interface ExperimentItem {
  id: string;
  index: string;
  title: string;
  desc: string;
  tag: string;
  year: string;
  gradient: string;
  link?: string;
}

export const getAllExperiments = (): ExperimentItem[] => {
  return experimentsData as ExperimentItem[];
};

export const getExperimentById = (id: string): ExperimentItem | undefined => {
  return (experimentsData as ExperimentItem[]).find((e) => e.id === id);
};

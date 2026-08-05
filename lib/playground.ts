import playgroundData from '@/data/playground.json';

export interface PlaygroundItem {
  id: string;
  index: string;
  title: string;
  desc: string;
  tag: string;
  gradient: string;
}

export const getAllPlaygroundItems = (): PlaygroundItem[] => {
  return playgroundData as PlaygroundItem[];
};

export const getPlaygroundItemById = (id: string): PlaygroundItem | undefined => {
  return (playgroundData as PlaygroundItem[]).find((p) => p.id === id);
};

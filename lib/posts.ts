import postsData from '@/data/posts.json';

export interface PostItem {
  index: string;
  title: string;
  desc: string;
  date: string;
  tag: string;
}

export const getAllPosts = (): PostItem[] => {
  return postsData as PostItem[];
};

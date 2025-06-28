import { MovieId } from './movie';

export type Collections = {
  [key: string]: MovieId[];
};

export type CollectionsName =
  | 'Best animation'
  | 'Best series'
  | 'Best movies'
  | 'Best detective series'
  | 'Best comedy movies';

export type CurrentCollection = {
  name: CollectionsName;
  type: string;
  rating: string;
  genre?: string;
};

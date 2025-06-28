export type Movie = {
  Title: string;
  Year: number;
  Runtime: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbRating: number | string;
  imdbID: string;
  Type: string;
  totalSeasons: number | 'N/A';
};

export type MovieId = {
  externalId: {
    imdb: string | null;
    tmdb: number | null;
    kpHD: string | null;
  };
};
export type MovieOnSearch = {
  id: number;
  externalId?: {
    imdb: string | null;
    tmdb: number | null;
    kpHD: string | null;
  };
};

export interface CarteleraResponse {
  results: Movie[];
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface Movie {
  popularity: number;
  id: number;
  video: boolean;
  vote_count: number;
  vote_average: number;
  title: string;
  release_date: Date;
  original_language: OriginalLanguage;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  poster_path: string;
}

export enum OriginalLanguage {
  En = 'en',
  Fr = 'fr',
  Ja = 'ja',
  Ko = 'ko',
}

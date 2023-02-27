export interface UserDataInterface {
  username: string;
  age: number;
  gender: string;
}

export interface UserStateInterface {
  data: UserDataInterface;
  status: 'idle' | 'loading' | 'failed';
}

export interface SearchMovieFormData {
  genres: string[];
  year?: string;
  rating?: string;
  exceptions?: number[];
}

export interface AnyMovieInterface {
  id: number;
  name: null | string;
  alternativeName: null | string;
  description: null | string;
  genres: null | string[];
  poster: null | string;
  countries: null | string[];
  year: null | number;
  movieLength: null | number;
  rating: { kp: null | number; imdb: null | number };
  actors: null | string[];
  director: null | string;
  trailer: null | string;
}

export interface MovieDataInterface {
  id: number;
  name: null | string;
  alternativeName: null | string;
  description: null | string;
  genres: null | { name: string }[];
  poster: null | { previewUrl: string };
  year: null | number;
  movieLength: null | number;
  rating: null | { kp: number; imdb: number };
  persons: null | { name: string; enProfession: string }[];
  countries: null | { name: string }[];
  videos: null | { trailers: { url: string }[] };
}
export interface ResponseSearchMovieInterface {
  docs: MovieDataInterface[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

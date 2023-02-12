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
}

export interface MovieDataInterface {
  id: number;
  name: null | string;
  alternativeName: null | string;
  description: null | string;
  genres: null | CountryType[];
  poster: null | PosterType;
  year: null | number;
  movieLength: null | number;
  rating: null | RatingType;
  persons: null | PersonType[];
  countries: null | CountryType[];
}

export type PersonType = {
  enName: string;
  enProfession: string;
  id: number;
  name: string;
  photo: string;
  profession: string;
  _id: string;
};

export type CountryType = {
  _id: string;
  name: string;
};

type PosterType = {
  previewUrl: string;
  url: string;
  _id: string;
};

type RatingType = {
  await: number;
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
  _id: string;
};

type TrailerType = {
  _id: string;
  url: string;
  name: string;
  site: string;
};

export interface ResponseSearchMovieInterface {
  docs: MovieDataInterface[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

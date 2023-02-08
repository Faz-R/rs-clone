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
  year: number | string;
  rating?: string;
  exceptions?: number[];
}

export interface MovieHumorInterface {
  id: number;
  name: string;
  alternativeName: string;
  description: string;
  genres: string[];
  poster: null | string;
  countries: null | string[];
  year: number;
  movieLength: number;
  rating: { kp: number; imdb: number };
}

export interface MovieRandomInterface extends MovieHumorInterface {
  actors: string[];
  director: string;
}

export interface MovieDataInterface {
  id: number;
  name: string;
  description: string;
  genres: CountryType[];
  poster: PosterType;
  year: number;
  movieLength: number;
  rating: RatingType;
  persons: PersonType[];
  countries: CountryType[];
  videos?: { trailers: TrailerType[] };
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

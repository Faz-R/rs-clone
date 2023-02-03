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
  year: number;
  rating?: string;
  exceptions?: number[];
}

export interface MovieHumorInterface {
  id: number;
  name: string;
  description: string;
  genres: string[];
  poster: null | string;
  country: null | string;
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
  genres: string[];
  poster: PosterType;
  year: number;
  movieLength: number;
  rating: RatingType;
  persons: PersonType[];
  premiere: PremiereType;
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

type PremiereType = {
  country: string;
  world: string;
  _id: string;
};

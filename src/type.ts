export interface UserDataInterface {
  username: string;
  age: number;
  gender: string;
}

export interface UserStateInterface {
  data: UserDataInterface;
  status: 'idle' | 'loading' | 'failed';
}

export interface MoviesByHumorInterface {
  genres: string[];
  year: number;
  rating?: '7-10';
  exceptions?: number[];
}

export interface MovieDataInterface {
  externalId: {
    kpHD: null | string;
    imdb: null | string;
    tmdb: number;
    _id: null | string;
  };
  logo: {
    _id: null | string;
    url: null | string;
  };
  poster: null | {
    _id: null | string;
    url: null | string;
    previewUrl: null | string;
  };
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
    _id: null | string;
  };
  votes: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
    _id: null | string;
  };
  watchability: {
    _id: null | string;
    items:
      | null
      | {
          logo: { _id: null | string; url: null | string };
          _id: null | string;
          name: null | string;
          url: null | string;
        }[];
  };
  id: number;
  alternativeName: null | string;
  description: null | string;
  enName: null | string;
  movieLength: number;
  name: null | string;
  names:
    | null
    | {
        _id: null | string;
        name: null | string;
      }[];

  shortDescription: null | string;
  type: null | string;
  year: number;
  releaseYears: [
    {
      start: number;
      end: number;
      _id: null | string;
    }
  ];
}

export interface MovieInterface {
  id: number;
  name: null | string;
  description: null | string;
  year: number;
  poster: null | string;
  rating: { kp: number; imdb: number };
}

export interface IIdViewed {
  id: number;
  name: string | null;
  countries: string[] | null;
  genres: string[];
  description: string;
  poster: string | null;
  rating: { kp: number; imdb: number };
  year: number;
}

export interface IIdViewedObject {
  viewed: IIdViewed[];
}

export interface IIdWillViewObject {
  value: IIdViewed[];
}

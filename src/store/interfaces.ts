export interface IIdViewed {
  id: number;
  name: string | null;
  countries: string[] | null;
  genres: string[] | null;
  description: string | null;
  poster: string | null;
  rating: { kp: number | null; imdb: number | null };
  year: number | null;
}

export interface IIdViewedObject {
  viewed: IIdViewed[];
}

export interface IIdWillViewObject {
  value: IIdViewed[];
}

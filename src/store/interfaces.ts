export interface IIdViewed {
  id: number;
  name: string;
  countries: string[] | null;
  genres: string[];
  description: string;
  poster: string | null;
  rating: number;
  year: number;
}

export interface IIdViewedObject {
  viewed: IIdViewed[];
}

export interface IIdWillViewObject {
  value: IIdViewed[];
}

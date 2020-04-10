export interface ISportObject {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  isPayed: boolean;
  isPremium: boolean;
  sport: ISport;
  city: ICity;
  reviews: IReview[];
}

export interface ICity {
  id: number;
  name: string;
  country: ICountry;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface ISport {
  id: number;
  name: string;
}

interface IReview {
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

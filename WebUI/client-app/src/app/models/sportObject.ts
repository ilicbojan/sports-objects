export interface ISportObjectsVm {
  sportObjects: ISportObject[];
  sportObjectsCount: number;
}

export interface ISportObject {
  id?: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  isPayed: boolean;
  isPremium: boolean;
  isFavourite: boolean;
  isReviewed: boolean;
  sport: ISport;
  city: ICity;
  image: IImage;
  prices: IPrice[];
  workingHours: IWorkingHour[];
  reviews: IReview[];
  images: IImage[];
}

interface ISport {
  id: number;
  name: string;
}

interface ICity {
  id: number;
  name: string;
}

interface IPrice {
  id: number;
  pricePerHour: number;
  timeFrom: string;
  timeTo: string;
}

interface IWorkingHour {
  id: number;
  day: number;
  openTime: string;
  closeTime: string;
}

interface IReview {
  user: IUser;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IUser {
  id: string;
  username: string;
}

interface IImage {
  id: string;
  url: string;
  isMain: boolean;
}

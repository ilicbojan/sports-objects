export interface ISportObjectsVm {
  sportObjects: ISportObject[];
  sportObjectsCount: number;
}

export interface ISportObject {
  id?: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  isPayed: boolean;
  isPremium: boolean;
  sportId: number;
  sport: ISport;
  cityId: number;
  city: ICity;
  prices: IPrice[];
  workingHours: IWorkingHour[];
  reviews: IReview[];
  reservations: IReservation[];
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
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IReservation {
  id: number;
  startTime: string;
  endtTime: string;
  date: Date;
  user: IUser;
  status: IReservationStatus;
}

interface IUser {
  id: string;
  username: string;
}

interface IReservationStatus {
  id: number;
  status: string;
}

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
  workingHours: IWorkingHour[];
  reviews: IReview[];
}

interface ISport {
  id: number;
  name: string;
}

interface ICity {
  id: number;
  name: string;
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

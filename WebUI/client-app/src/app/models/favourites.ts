export interface IFavouritesVm {
  favourites: IFavourite[];
}

export interface IFavourite {
  id: number;
  sportObject: ISportObject;
}

interface ISportObject {
  id: number;
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
}

interface ISport {
  id: number;
  name: string;
}

interface ICity {
  id: number;
  name: string;
}

interface IImage {
  id: string;
  url: string;
  isMain: boolean;
}

// export class Favourite implements IFavourite {
//   id: number = 0;
//   sportObjectId: number = 0;
// }

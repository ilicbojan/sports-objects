export interface IReviewsVm {
  reviews: IReview[];
  reviewsCount: number;
}

export interface IReview {
  user: IUser;
  sportObject: ISportObject;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface IUser {
  id: string;
  username: string;
}

interface ISportObject {
  id: number;
  name: string;
}

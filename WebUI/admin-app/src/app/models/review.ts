export interface IReviewsVm {
  reviews: IReview[];
  reviewsCount: number;
}

export interface IReview {
  username: string;
  sportObject: ISportObject;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ISportObject {
  id: number;
  name: string;
}

import React from 'react';
import { observer } from 'mobx-react-lite';
import { ISportObject } from '../../../../../app/models/sportObject';
import ReviewListItem from '../list-item/ReviewListItem';

interface IProps {
  sportObject: ISportObject;
}

const ReviewList: React.FC<IProps> = ({ sportObject }) => {
  return (
    <div>
      <h3>Recenzije</h3>
      {sportObject.reviews.length > 0 ? (
        <div>
          {sportObject.reviews.map((review, index) => (
            <ReviewListItem key={index} review={review} />
          ))}
        </div>
      ) : (
        <div>Trenutno nema recenzija</div>
      )}
    </div>
  );
};

export default observer(ReviewList);

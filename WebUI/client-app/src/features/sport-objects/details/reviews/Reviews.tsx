import React, { useContext } from 'react';
import ReviewCreate from './create/ReviewCreate';
import { S } from './Reviews.style';
import ReviewList from './list/ReviewList';
import { ISportObject } from '../../../../app/models/sportObject';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../app/stores/rootStore';

interface IProps {
  sportObject: ISportObject;
}

const Reviews: React.FC<IProps> = ({ sportObject }) => {
  const rootStore = useContext(RootStoreContext);
  const { isClient, isLoggedIn } = rootStore.userStore;

  return (
    <S.Reviews>
      {isLoggedIn && !isClient && !sportObject.isReviewed && <ReviewCreate />}

      <ReviewList sportObject={sportObject} />
    </S.Reviews>
  );
};

export default observer(Reviews);

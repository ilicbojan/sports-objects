import React, { useContext } from 'react';
import { ISportObject } from '../../../../app/models/sportObject';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { S } from './Heading.style';
import Button from '../../../../app/common/button/Button';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';

interface IProps {
  sportObject: ISportObject;
}

const Heading: React.FC<IProps> = ({ sportObject }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, isClient } = rootStore.userStore;
  const {
    removeFromFavourites,
    addToFavourites,
    submitting,
  } = rootStore.favouriteStore;

  return (
    <S.Heading>
      <h1>{sportObject.name}</h1>
      <div className='addressDiv'>
        <span className='address'>Adresa: </span>
        {sportObject.address}
      </div>
      <S.Flex>
        <S.Info>
          <S.Sport>{sportObject.city.name}</S.Sport>
          <S.Sport>{sportObject.sport.name}</S.Sport>
        </S.Info>
        {isLoggedIn && !isClient && (
          <>
            {sportObject.isFavourite ? (
              <Button
                type='button'
                color='red'
                onClick={() => removeFromFavourites(sportObject)}
                loading={submitting}
              >
                <FaHeartBroken />
                Ukloni
              </Button>
            ) : (
              <Button
                type='button'
                color='secondary'
                onClick={() => addToFavourites(sportObject)}
                loading={submitting}
              >
                <FaHeart />
                Dodaj
              </Button>
            )}
          </>
        )}
      </S.Flex>
    </S.Heading>
  );
};

export default observer(Heading);

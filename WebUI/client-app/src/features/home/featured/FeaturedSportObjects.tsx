import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import SportObjectCard from '../../sport-objects/card/SportObjectCard';
import { S } from './FeaturedSportObjects.style';

const FeaturedSportObjects = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    featuredSportObjects,
    loadFeaturedSportObjects,
    loadingSportObjects,
  } = rootStore.sportObjectStore;

  useEffect(() => {
    loadFeaturedSportObjects();
  }, [loadFeaturedSportObjects]);

  return (
    <S.FeaturedSportObjects>
      <h3>
        <FaThumbsUp />
        Preporuceni tereni
      </h3>

      {loadingSportObjects ? (
        <LoadingSpinner />
      ) : (
        <S.List>
          {featuredSportObjects.map((sportObject) => (
            //<SportObjectListItem key={sportObject.id} sportObject={sportObject} />
            <SportObjectCard key={sportObject.id} sportObject={sportObject} />
          ))}
        </S.List>
      )}
    </S.FeaturedSportObjects>
  );
};

export default observer(FeaturedSportObjects);

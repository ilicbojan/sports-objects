import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './SportObjectList.style';
import SportObjectCard from '../card/SportObjectCard';
import Button from '../../../app/common/button/Button';
import SportObjectFilter from '../filter/SportObjectFilter';
import { FaAngleDown } from 'react-icons/fa';

const SportObjectList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    sportObjects,
    setPredicate,
    predicate,
    loadingSportObjects,
  } = rootStore.sportObjectStore;

  const [filter, setFilter] = useState(false);

  const onClick = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    if (predicate.size < 1) {
      setPredicate('', '');
    }
  }, [setPredicate, predicate]);

  return (
    <S.SportObjectList>
      <div className='mobileFilter'>
        <Button
          type='button'
          onClick={onClick}
          color='secondary'
          className='filterBtn'
        >
          Filter
          <FaAngleDown />
        </Button>
        {filter && <SportObjectFilter setFilter={setFilter} />}
      </div>
      <div className='desktopFilter'>
        <SportObjectFilter setFilter={setFilter} />
      </div>

      <div className='list'>
        {loadingSportObjects ? (
          <LoadingSpinner />
        ) : (
          <S.List>
            {sportObjects.map((sportObject) => (
              //<SportObjectListItem key={sportObject.id} sportObject={sportObject} />
              <SportObjectCard key={sportObject.id} sportObject={sportObject} />
            ))}
          </S.List>
        )}
      </div>
    </S.SportObjectList>
  );
};

export default observer(SportObjectList);

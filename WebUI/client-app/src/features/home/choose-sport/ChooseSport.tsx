import React, { useContext } from 'react';
import { S } from './ChooseSport.style';
import { GiSoccerBall, GiBasketballBall, GiTennisBall } from 'react-icons/gi';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ChooseSport = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.sportObjectStore;
  return (
    <S.ChooseSport>
      <S.Sport onClick={() => setPredicate('sportId', '5')}>
        <span>
          <GiSoccerBall />
        </span>
        <h5>Fudbal</h5>
        <div>Broj terena: 24</div>
      </S.Sport>
      <S.Sport onClick={() => setPredicate('sportId', '4')}>
        <span>
          <GiBasketballBall />
        </span>
        <h5>Kosarka</h5>
        <div>Broj terena: 31</div>
      </S.Sport>
      <S.Sport onClick={() => setPredicate('sportId', '3')}>
        <span>
          <GiTennisBall />
        </span>
        <h5>Tenis</h5>
        <div>Broj terena: 45</div>
      </S.Sport>
    </S.ChooseSport>
  );
};

export default observer(ChooseSport);

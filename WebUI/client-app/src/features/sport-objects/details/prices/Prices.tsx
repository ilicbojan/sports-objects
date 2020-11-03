import { observer } from 'mobx-react-lite';
import React from 'react';
import { ISportObject } from '../../../../app/models/sportObject';
import { Style } from '../../../../style';
import { S } from './Prices.style';

interface IProps {
  sportObject: ISportObject;
}

const Prices: React.FC<IProps> = ({ sportObject }) => {
  return (
    <S.Prices>
      <Style.SportObjectDetailsCard>
        <div className='header'>
          <h3>Cene</h3>
        </div>
        <div className='body'>
          {sportObject.prices.length > 0 ? (
            <S.Content>
              <S.Left>
                {sportObject.prices.map((price) => (
                  <div key={price.id}>
                    {price.timeFrom.slice(0, -3)} - {price.timeTo.slice(0, -3)}
                  </div>
                ))}
              </S.Left>
              <S.Right>
                {sportObject.prices.map((price) => (
                  <div key={price.id}>{price.pricePerHour} RSD</div>
                ))}
              </S.Right>
            </S.Content>
          ) : (
            <div>Trenutno nema informacija o cenama</div>
          )}
        </div>
      </Style.SportObjectDetailsCard>
    </S.Prices>
  );
};

export default observer(Prices);

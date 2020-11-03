import { observer } from 'mobx-react-lite';
import React from 'react';
import { ISportObject } from '../../../../app/models/sportObject';
import { Style } from '../../../../style';
import { S } from './WorkingHours.style';

interface IProps {
  sportObject: ISportObject;
}

const WorkingHours: React.FC<IProps> = ({ sportObject }) => {
  return (
    <S.WorkingHours>
      <Style.SportObjectDetailsCard>
        <div className='header'>
          <h3>Radno vreme</h3>
        </div>
        <div className='body'>
          {sportObject.workingHours.length > 0 ? (
            <S.Content>
              <S.Left>
                <div>Ponedeljak</div>
                <div>Utorak</div>
                <div>Sreda</div>
                <div>Cetvrtak</div>
                <div>Petak</div>
                <div>Subota</div>
                <div>Nedelja</div>
              </S.Left>
              <S.Right>
                {sportObject.workingHours.map((wh) => (
                  <div key={wh.id}>
                    {wh.openTime.slice(0, -3)} - {wh.closeTime.slice(0, -3)}
                  </div>
                ))}
              </S.Right>
            </S.Content>
          ) : (
            <div>Trenutno nema informacija o radnom vremenu</div>
          )}
        </div>
      </Style.SportObjectDetailsCard>
    </S.WorkingHours>
  );
};

export default observer(WorkingHours);

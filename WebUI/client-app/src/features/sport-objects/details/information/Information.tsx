import React from 'react';
import { ISportObject } from '../../../../app/models/sportObject';
import { Style } from '../../../../style';
import { S } from './Information.style';

interface IProps {
  sportObject: ISportObject;
}

const Information: React.FC<IProps> = ({ sportObject }) => {
  return (
    <S.Information>
      <Style.SportObjectDetailsCard>
        <div className='header'>
          <h3>Informacije</h3>
        </div>
        <div className='body'>
          <div>Adresa: {sportObject.address}</div>
          <div>Email: {sportObject.email}</div>
          <div>Telefon: {sportObject.phone}</div>
        </div>
      </Style.SportObjectDetailsCard>
    </S.Information>
  );
};

export default Information;

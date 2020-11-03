import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { ISportObject } from '../../../app/models/sportObject';
import { S } from '../list-item/SportObjectListItem.style';

interface IProps {
  sportObject: ISportObject;
}

const SportObjectListItem: React.FC<IProps> = ({ sportObject }) => {
  return (
    <S.SportObjectListItem>
      <h2>{sportObject.name}</h2>
      <S.Header>
        <S.HeaderImage src={sportObject.image && sportObject.image.url} />
        <S.HeaderText>
          <div>
            <span>Sport:</span> {sportObject.sport.name}
          </div>
          <div>
            <span>Grad:</span> {sportObject.city.name}
          </div>
          <div>
            <span>Telefon:</span> {sportObject.phone}
          </div>
          {/* <h5>12 slobodnih termina u narednih 7 dana</h5> */}
        </S.HeaderText>
      </S.Header>
      <S.Body>
        <div>{sportObject.email}</div>
        <div>{sportObject.address}</div>
        {/* <S.Column>
          <div>
            <span>Email:</span> {sportObject.email}
          </div>
        </S.Column>
        <S.Column>
          <div>
            <span>Grad:</span> {sportObject.city.name}
          </div>
        </S.Column> */}
      </S.Body>
      <Link to={`/fields/${sportObject.id}`}>
        <Button type='button' color='primary' block>
          REZERVACIJA
        </Button>
      </Link>
    </S.SportObjectListItem>
  );
};

export default observer(SportObjectListItem);

import React, { useState, useRef, useEffect } from 'react';
import { S } from './SportObjectCard.style';
import { ISportObject } from '../../../app/models/sportObject';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface IProps {
  sportObject: ISportObject;
}

const SportObjectCard: React.FC<IProps> = ({ sportObject }) => {
  const [width, setWidth] = useState(1);

  const resizeRef = useRef<any>();
  const cardRef = useRef<any>();

  useEffect(() => {
    setWidth(cardRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const resize = () => {
      resizeRef.current();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleResize = () => {
    setWidth(cardRef.current.offsetWidth);
  };

  return (
    <Link to={`/fields/${sportObject.id}`}>
      <S.SportObjectCard height={width / 1.42857} ref={cardRef}>
        <S.Image image={sportObject.image?.url}>
          <div>
            <S.Heading>{sportObject.name}</S.Heading>
            <S.SubHeading>
              <S.Sport>{sportObject.sport.name}</S.Sport>
              <S.Sport>{sportObject.city.name}</S.Sport>
            </S.SubHeading>
          </div>
          <div>
            <S.Info>
              <div>{sportObject.address}</div>
              <div>{sportObject.phone}</div>
            </S.Info>
          </div>
        </S.Image>
      </S.SportObjectCard>
    </Link>
  );
};

export default observer(SportObjectCard);

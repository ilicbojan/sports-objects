import { observer } from 'mobx-react-lite';
import React, { useState, useRef, useEffect } from 'react';
import ImageSlider from '../../../../app/common/image-slider/slider/ImageSlider';
import { S } from './Images.style';
import { ISportObject } from '../../../../app/models/sportObject';

interface IProps {
  sportObject: ISportObject;
}

const Images: React.FC<IProps> = ({ sportObject }) => {
  const [width, setWidth] = useState(1);

  const resizeRef = useRef<any>();
  const imageRef = useRef<any>();

  useEffect(() => {
    if (sportObject.images.length > 0) {
      setWidth(imageRef.current.offsetWidth);
    }
  }, [setWidth, sportObject.images.length]);

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
    if (sportObject.images.length > 0) {
      setWidth(imageRef.current.offsetWidth);
    }
  };

  return (
    <>
      {sportObject.images.length > 0 && (
        <S.Images height={(width - 30) / 1.42857} ref={imageRef}>
          <ImageSlider slides={sportObject?.images} />
        </S.Images>
      )}
    </>
  );
};

export default observer(Images);

import React from 'react';
import { ISportObject } from '../../../app/models/sportObject';
import { S } from './ContactInfo.style';

interface IProps {
  sportObject?: ISportObject;
}

const ContactInfo: React.FC<IProps> = ({ sportObject }) => {
  return (
    <S.ContactInfo className='fullWidth'>
      {sportObject ? (
        <>
          <a href={`mailto: ${sportObject?.email}`}>{sportObject?.email}</a>
          <a className='phone' href={`tel: ${sportObject?.phone}`}>
            {sportObject?.phone}
          </a>
        </>
      ) : (
        <>
          <a href='mailto: test@test.com'>test@test.com</a>
          <a className='phone' href='tel:+381651234567'>
            0651234567
          </a>{' '}
        </>
      )}
    </S.ContactInfo>
  );
};

export default ContactInfo;

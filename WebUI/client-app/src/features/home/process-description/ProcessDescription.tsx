import React from 'react';
import { FaCalendarAlt, FaRunning, FaSearch } from 'react-icons/fa';
import { S } from './ProcessDescription.style';

const ProcessDescription = () => {
  return (
    <S.ProcessDescription>
      <S.Card>
        <FaSearch />
        <h2>Pronadji</h2>
        <p>
          SDask sad jsakl sadj saklj sald kjsalkj sa kjsalkdj lk askjld j alksd
          jkl salkj kjsalj klkasj kljs lkjldks alk lkj alskldska ljkl
          asldkjla;sdpoqp sa
        </p>
      </S.Card>
      <S.Card>
        <FaCalendarAlt />
        <h2>Rezervisi</h2>
        <p>
          SDask sad jsakl sadj saklj sald kjsalkj sa kjsalkdj lk askjld j alksd
          jkl salkj kjsalj klkasj kljs lkjldks alk lkj alskldska ljkl
          asldkjla;sdpoqp sa
        </p>
      </S.Card>
      <S.Card>
        <FaRunning />
        <h2>Igraj</h2>
        <p>
          SDask sad jsakl sadj saklj sald kjsalkj sa kjsalkdj lk askjld j alksd
          jkl salkj kjsalj klkasj kljs lkjldks alk lkj alskldska ljkl
          asldkjla;sdpoqp sa
        </p>
      </S.Card>
    </S.ProcessDescription>
  );
};

export default ProcessDescription;

import React, { Fragment } from 'react';
import { S } from '../../../styles';
import { observer } from 'mobx-react-lite';

const SportObjectsOverview = () => {
  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Sport objects overview</h2>
      </S.HeaderContainer>
    </Fragment>
  );
};

export default observer(SportObjectsOverview);

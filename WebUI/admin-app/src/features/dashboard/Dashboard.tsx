import React, { Fragment } from 'react';
import { S } from '../../styles';
import { observer } from 'mobx-react-lite';

const Dashboard = () => {
  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Dashboard</h2>
      </S.HeaderContainer>
    </Fragment>
  );
};

export default observer(Dashboard);

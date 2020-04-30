import React, { Fragment, useContext, useEffect } from 'react';
import { S } from '../../../styles';
import { Row, Col } from 'antd';
import SportList from '../list/SportList';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import SportCreate from '../create/SportCreate';

const SportDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadSports } = rootStore.sportStore;

  useEffect(() => {
    loadSports();
  }, [loadSports]);

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Sports</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <SportList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <SportCreate />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(SportDashboard);

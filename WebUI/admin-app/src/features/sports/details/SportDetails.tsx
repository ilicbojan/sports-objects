import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Spin, Row, Col } from 'antd';
import NotFound from '../../../app/layout/NotFound';
import { RouteComponentProps } from 'react-router-dom';
import SportEdit from '../edit/SportEdit';
import SportSportObjectsList from '../sport-objects-list/SportSportObjectsList';

const SportDetails: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadSport, sport, loadingInitial } = rootStore.sportStore;

  useEffect(() => {
    loadSport(Number(match.params.id));
  }, [loadSport, match]);

  if (loadingInitial) return <Spin></Spin>;

  if (!sport) return <NotFound />;

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>{sport.name}</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <SportSportObjectsList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <SportEdit />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(SportDetails);

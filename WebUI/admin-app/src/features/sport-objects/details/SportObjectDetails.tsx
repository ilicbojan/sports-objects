import React, { Fragment, useContext, useEffect } from 'react';
import { S } from '../../../styles';
import { Tabs, Spin } from 'antd';
import SportObjectEdit from '../edit/SportObjectEdit';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import NotFound from '../../../app/layout/NotFound';
import SportObjectReviewsList from '../reviews-list/SportObjectReviewsList';
import WorkingHoursCreate from '../working-hours/WorkingHoursCreate';
import WorkingHoursEdit from '../working-hours/WorkingHoursEdit';

const SportObjectDetails: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    sportObject,
    loadSportObject,
    loadingInitial,
  } = rootStore.sportObjectStore;
  const { loadCities } = rootStore.cityStore;
  const { loadSports } = rootStore.sportStore;

  const { TabPane } = Tabs;

  useEffect(() => {
    loadSportObject(Number(match.params.id));
    loadCities();
    loadSports();
  }, [loadSportObject, loadCities, loadSports, match]);

  if (loadingInitial) return <Spin></Spin>;

  if (!sportObject) return <NotFound />;

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>{sportObject.name}</h2>
      </S.HeaderContainer>
      <S.ContentContainer>
        <Tabs defaultActiveKey='2'>
          {/* <TabPane tab='Info' key='1'>
            Informations
          </TabPane> */}
          <TabPane tab='Edit' key='2'>
            <SportObjectEdit />
          </TabPane>
          <TabPane tab='Work hours' key='3'>
            {sportObject.workingHours === undefined ||
            sportObject.workingHours.length === 0 ? (
              <WorkingHoursCreate />
            ) : (
              <WorkingHoursEdit />
            )}
          </TabPane>
          <TabPane tab='Reviews' key='4'>
            <SportObjectReviewsList />
          </TabPane>
        </Tabs>
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(SportObjectDetails);

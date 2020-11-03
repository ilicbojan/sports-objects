import React, { Fragment, useContext, useEffect } from 'react';
import HomePage from '../../features/home/page/HomePage';
import { Route, Switch, withRouter } from 'react-router-dom';
import PartnershipPage from '../../features/partnership/page/PartnershipPage';
import SportObjectList from '../../features/sport-objects/list/SportObjectList';
import { RootStoreContext } from '../stores/rootStore';
import Modal from '../common/modal/Modal';
import { observer } from 'mobx-react-lite';
import SportObjectDetails from '../../features/sport-objects/details/SportObjectDetails';
import UserProfile from '../../features/users/profile/UserProfile';
import NotFound from './not-found/NotFound';
import { ToastContainer } from 'react-toastify';
import PricesEdit from '../../features/prices/edit/PricesEdit';
import WorkingHours from '../../features/working-hours/WorkingHours';
import SportObjectEdit from '../../features/sport-objects/edit/SportObjectEdit';
import ReservationList from '../../features/reservations/list/ReservationList';
import ImageList from '../../features/images/list/ImageList';
import PrivateRoute from './PrivateRoute';
import FavouritesList from '../../features/favourites/list/FavouritesList';
import Nav from './nav/navigation/Nav';
import LoadingSpinner from './spinner/LoadingSpinner';
import UserEdit from '../../features/users/edit/UserEdit';

function App() {
  const rootStore = useContext(RootStoreContext);
  const { modal } = rootStore.modalStore;
  const { token, setAppLoaded, appLoaded } = rootStore.commonStore;
  const { currentUser, isClient } = rootStore.userStore;
  const { loadMySportObject } = rootStore.sportObjectStore;
  const { loadSports } = rootStore.sportStore;
  const { loadCities } = rootStore.cityStore;
  const { loadNext7Dates } = rootStore.reservationStore;

  useEffect(() => {
    if (token) {
      currentUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [currentUser, token, setAppLoaded]);

  useEffect(() => {
    if (isClient) {
      loadMySportObject();
    }
  }, [isClient, loadMySportObject]);

  useEffect(() => {
    loadNext7Dates();
    loadCities();
    loadSports();
  }, [loadCities, loadSports, loadNext7Dates]);

  if (!appLoaded) return <LoadingSpinner />;

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      {/* <Navigation /> */}
      <Nav />
      <div className='appContainer'>
        <Modal show={modal.open}></Modal>
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Fragment>
              <Switch>
                <Route exact path='/fields' component={SportObjectList} />
                <Route
                  exact
                  path='/fields/:id'
                  component={SportObjectDetails}
                />
                <Route exact path='/partnership' component={PartnershipPage} />
                <PrivateRoute exact path='/profile' component={UserProfile} />
                <PrivateRoute exact path='/profile/edit' component={UserEdit} />
                <PrivateRoute
                  exact
                  path='/reservations'
                  component={ReservationList}
                />
                <PrivateRoute
                  exact
                  path='/favourites'
                  user
                  component={FavouritesList}
                />
                <PrivateRoute
                  path='/my-sport-object'
                  client
                  component={SportObjectEdit}
                />
                <PrivateRoute
                  exact
                  path='/working-hours'
                  client
                  component={WorkingHours}
                />
                <PrivateRoute
                  exact
                  path='/prices'
                  client
                  component={PricesEdit}
                />
                <PrivateRoute path='/images' client component={ImageList} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </Fragment>
  );
}

export default withRouter(observer(App));

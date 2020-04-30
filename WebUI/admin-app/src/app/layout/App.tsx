import React, { Fragment, useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import NavTop from '../../features/nav/nav-top/NavTop';
import NavSide from '../../features/nav/nav-side/NavSide';
import { Layout, Spin } from 'antd';
import LoginPage from '../../features/users/login/LoginPage';
import { LoadingOutlined } from '@ant-design/icons';
import { RootStoreContext } from '../stores/rootStore';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../../features/dashboard/Dashboard';
import SportObjectsOverview from '../../features/sport-objects/overview/SportObjectsOverview';
import SportObjectsList from '../../features/sport-objects/list/SportObjectsList';
import SportObjectCreate from '../../features/sport-objects/create/SportObjectCreate';
import SportObjectDetails from '../../features/sport-objects/details/SportObjectDetails';
import NotFound from './NotFound';
import CityDashboard from '../../features/cities/dashboard/CityDashboard';
import SportDashboard from '../../features/sports/dashboard/SportDashboard';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import SportDetails from '../../features/sports/details/SportDetails';
import CountryDetails from '../../features/countries/details/CountryDetails';
import CityDetails from '../../features/cities/details/CityDetails';
import RoleDashboard from '../../features/roles/dashboard/RoleDashboard';
import RoleDetails from '../../features/roles/details/RoleDetails';
import ReviewDashboard from '../../features/reviews/dashboard/ReviewDashboard';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { appLoaded, setAppLoaded, token } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <Spin tip='Loadin app..'></Spin>;

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={LoginPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Layout style={{ minHeight: '100vh' }}>
            <NavTop />
            <Layout>
              <NavSide />
              <Layout>
                <Layout.Content
                  style={{
                    padding: '25px 30px',
                    marginLeft: '250px',
                    marginTop: '65px',
                  }}
                >
                  <Switch>
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <PrivateRoute
                      path='/sportobjects/overview'
                      component={SportObjectsOverview}
                    />
                    <PrivateRoute
                      path='/sportobjects/list'
                      component={SportObjectsList}
                    />
                    <PrivateRoute
                      path='/sportobjects/create'
                      component={SportObjectCreate}
                    />
                    <PrivateRoute
                      path='/sportobjects/details/:id'
                      component={SportObjectDetails}
                    />
                    <PrivateRoute
                      exact
                      path='/sports'
                      component={SportDashboard}
                    />
                    <PrivateRoute path='/sports/:id' component={SportDetails} />
                    <PrivateRoute
                      exact
                      path='/cities'
                      component={CityDashboard}
                    />
                    <PrivateRoute path='/cities/:id' component={CityDetails} />
                    <PrivateRoute
                      exact
                      path='/countries'
                      component={CountryDashboard}
                    />
                    <PrivateRoute
                      path='/countries/:id'
                      component={CountryDetails}
                    />
                    <PrivateRoute
                      exact
                      path='/roles'
                      component={RoleDashboard}
                    />
                    <PrivateRoute path='/roles/:id' component={RoleDetails} />
                    <PrivateRoute path='/reviews' component={ReviewDashboard} />

                    <PrivateRoute component={NotFound} />
                  </Switch>
                </Layout.Content>
              </Layout>
            </Layout>
          </Layout>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));

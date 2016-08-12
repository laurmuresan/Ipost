import React from 'react';

import { Route, IndexRoute, Redirect } from 'react-router';
import AuthRoute from './components/auth-route';
import { logout, redirectIfAuthenticated } from './utils/auth';

import Root from './pages/root';
import Dashboard from './pages/dashboard';

const Routes = (
  <Route component={Root}>
    <IndexRoute component={Dashboard}/>
    <Redirect from='/' to='/dashboard/'/>

    <AuthRoute
      path='dashboard(/)'
      component={Dashboard}
      title='Dashboard'
    />

  </Route>
);

export default Routes;

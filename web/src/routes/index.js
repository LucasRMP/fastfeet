import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import Deliverymen from '~/pages/Deliverymen';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';

import SignIn from '~/pages/SignIn';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}

export default Routes;
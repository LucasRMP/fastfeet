import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import DeliveryRoutes from './Delivery.routes';

import Deliverymen from '~/pages/Deliverymen';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';

import SignIn from '~/pages/SignIn';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <SignIn />
      </Route>

      <DeliveryRoutes path="/deliveries" isPrivate />

      <Route path="/deliverymen" exact isPrivate>
        <Deliverymen />
      </Route>
      <Route path="/recipients" isPrivate>
        <Recipients />
      </Route>
      <Route path="/problems" isPrivate>
        <Problems />
      </Route>
    </Switch>
  );
}

export default Routes;

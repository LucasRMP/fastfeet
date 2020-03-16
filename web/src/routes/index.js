import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import DeliveryRoutes from './Delivery.routes';
import DeliverymenRoutes from './Deliverymen.routes';
import RecipientRoutes from './Recipient.routes';

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

      <DeliverymenRoutes path="/deliverymen" isPrivate />

      <RecipientRoutes path="/recipients" isPrivate />

      <Route path="/problems" isPrivate>
        <Problems />
      </Route>
    </Switch>
  );
}

export default Routes;

import React from 'react';

import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import DeliveryUpdate from '~/pages/DeliveryUpdate';

function DeliveryRoutes({ path, isPrivate }) {
  return (
    <>
      <Route exact path={path} isPrivate={isPrivate}>
        <Dashboard />
      </Route>
      <Route path={`${path}/:deliveryId`} isPrivate={isPrivate}>
        <DeliveryUpdate />
      </Route>
    </>
  );
}

export default DeliveryRoutes;

import React from 'react';
import PT from 'prop-types';

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

DeliveryRoutes.propTypes = {
  path: PT.string.isRequired,
  isPrivate: PT.bool,
};

DeliveryRoutes.defaultProps = {
  isPrivate: false,
};

export default DeliveryRoutes;

import React from 'react';
import PT from 'prop-types';

import Route from './Route';

import Deliverymen from '~/pages/Deliverymen';
import DeliverymanUpdate from '~/pages/DeliverymanUpdate';

function DeliverymenRoutes({ path, isPrivate }) {
  return (
    <>
      <Route exact path={path} isPrivate={isPrivate}>
        <Deliverymen />
      </Route>
      <Route path={`${path}/:deliverymanId`} isPrivate={isPrivate}>
        <DeliverymanUpdate />
      </Route>
    </>
  );
}

DeliverymenRoutes.propTypes = {
  path: PT.string.isRequired,
  isPrivate: PT.bool,
};

DeliverymenRoutes.defaultProps = {
  isPrivate: false,
};

export default DeliverymenRoutes;

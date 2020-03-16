import React from 'react';
import PT from 'prop-types';

import Route from './Route';

import Recipients from '~/pages/Recipients';
import RecipientsUpdate from '~/pages/RecipientsUpdate';

function DeliveryRoutes({ path, isPrivate }) {
  return (
    <>
      <Route exact path={path} isPrivate={isPrivate}>
        <Recipients />
      </Route>
      <Route path={`${path}/:recipientId`} isPrivate={isPrivate}>
        <RecipientsUpdate />
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

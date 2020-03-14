import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PT from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';
import AuthLayout from '~/pages/_layouts/auth';

function RouteWrapper({ isPrivate, children, ...rest }) {
  const signed = useSelector(state => state.auth.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />;
  }

  const Layout = !signed ? AuthLayout : DefaultLayout;

  return (
    <Route {...rest}>
      <Layout>{children}</Layout>
    </Route>
  );
}

RouteWrapper.propTypes = {
  children: PT.oneOfType([PT.element, PT.func]).isRequired,
  isPrivate: PT.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;

import React from 'react';
import PT from 'prop-types';

import Header from '~/components/Header';

import { Container } from './styles';

function Default({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

Default.propTypes = {
  children: PT.oneOfType([PT.func, PT.element]).isRequired,
};

export default Default;

import React from 'react';
import PT from 'prop-types';

import { Container, Content } from './styles';

function Auth({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}

Auth.propTypes = {
  children: PT.element.isRequired,
};

export default Auth;

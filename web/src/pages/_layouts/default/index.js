import React from 'react';
import PT from 'prop-types';

import { Container, Wrapper } from './styles';

function Default({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

Default.propTypes = {
  children: PT.oneOfType([PT.func, PT.element]).isRequired,
};

export default Default;

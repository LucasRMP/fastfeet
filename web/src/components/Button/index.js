import React from 'react';
import PT from 'prop-types';

import { Container } from './styles';

function Button({ enabled, color, background, icon: Icon, children, ...rest }) {
  return (
    <Container
      enabled={enabled}
      color={color}
      background={background}
      {...rest}
    >
      <Icon size={25} color={color} />
      {children}
    </Container>
  );
}

Button.propTypes = {
  enabled: PT.bool,
  color: PT.string.isRequired,
  background: PT.string.isRequired,
  icon: PT.oneOfType([PT.func, PT.element]),
  children: PT.string,
};

Button.defaultProps = {
  enabled: true,
  icon: () => {},
  children: '',
};

export default Button;

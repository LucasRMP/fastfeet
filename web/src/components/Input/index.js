import React from 'react';
import PT from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, icon: Icon, action, ...rest }) {
  return (
    <Container style={style}>
      {Icon && <Icon size={20} color="#999" onClick={action} />}
      <TInput
        {...rest}
        onKeyDown={e => {
          if (e.key === 'Enter') action();
        }}
      />
    </Container>
  );
}

Input.propTypes = {
  style: PT.oneOfType([PT.object, PT.array]),
  icon: PT.oneOfType([PT.func, PT.element]),
  action: PT.func.isRequired,
};

Input.defaultProps = {
  style: {},
  icon: null,
};

export default Input;

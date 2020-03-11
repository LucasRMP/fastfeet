import React from 'react';
import PT from 'prop-types';

import { Popup } from './styles';

function PopUp({ children, opened, ...rest }) {
  return (
    <Popup open={opened} modal closeOnDocumentClick closeOnEscape {...rest}>
      {children}
    </Popup>
  );
}

PopUp.propTypes = {
  children: PT.oneOfType([
    PT.element,
    PT.func,
    PT.arrayOf(PT.element),
    PT.arrayOf(PT.func),
  ]).isRequired,
  opened: PT.bool.isRequired,
};

export default PopUp;

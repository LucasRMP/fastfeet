import React, { useState } from 'react';
import PT from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, ActionsDropdown, Action, ActionText } from './styles';

function Actions({ options }) {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <MdMoreHoriz
        onClick={() => setVisible(!visible)}
        size={30}
        color="#C6C6C6"
      />

      <ActionsDropdown visible={visible}>
        {options.map(action => (
          <Action key={action.text} onClick={action.action}>
            {action.icon}
            <ActionText>{action.text}</ActionText>
          </Action>
        ))}
      </ActionsDropdown>
    </Container>
  );
}

Actions.propTypes = {
  options: PT.arrayOf(PT.object),
};

Actions.defaultProps = {
  options: [],
};

export default Actions;

import styled from 'styled-components';
import ExpPopup from 'reactjs-popup';

export const Popup = styled(ExpPopup)`
  &-overlay {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      width: 100%;
      padding: 25px 20px;
      border-radius: 4px;
    }
  }
`;

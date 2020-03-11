import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  user-select: none;
`;

export const Badge = styled.div`
  position: relative;
`;

export const ActionsDropdown = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  position: absolute;
  padding: 10px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  min-width: 150px;
  left: calc(50% - 75px);
  z-index: 5;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #eee;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background 0.25s;

  & + div {
    border-top: 1px solid #eee;
  }

  &:hover {
    background: #efefef;
  }
`;

export const ActionText = styled.div`
  margin-left: 10px;
  color: #999;
  font-size: 16px;
`;

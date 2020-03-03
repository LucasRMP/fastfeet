import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  color: ${props => props.color};
  background: ${props => props.background};
  opacity: ${props => (props.enabled ? 1 : 0.6)};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 13px 5px 8px;
  border: none;
  border-radius: 4px;
  transition: background 0.25s;

  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background: ${props => darken(0.05, props.background)};
  }

  svg {
    margin-right: 7px;
  }
`;

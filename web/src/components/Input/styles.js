import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 5px;
  background: #fff;
  height: 36px;

  svg {
    cursor: pointer;
    margin-right: 5px;
    transition: filter 0.25s;

    &:hover {
      filter: brightness(50%);
    }
  }
`;

export const TInput = styled.input`
  background: none;
  border: none;
  flex: 1;
`;

import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #7d40e7;
`;

export const Content = styled.div`
  width: 360px;
  height: 425px;
  padding: 45px 30px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  background: #f5f5f5;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, 0.75);

  img {
    width: 250px;
    height: 45px;
  }

  form {
    display: flex;
    flex: 1;
    align-items: center;
  }
`;

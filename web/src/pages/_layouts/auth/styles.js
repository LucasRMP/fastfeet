import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #7d40e7;
`;

export const Content = styled.div`
  width: 360px;
  min-height: 425px;
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
    transition: filter 0.25s;

    &:hover {
      filter: brightness(80%);
    }
  }

  form {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      margin-bottom: 9px;
      text-align: left;
      padding-left: 5px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      color: #444;
      transition: color 0.25s;

      &:hover {
        color: ${darken(0.25, '#444')};
      }
    }

    input {
      margin-bottom: 30px;
      height: 45px;
      padding: 15px 12px;
      background: #fff;
      border: 1px solid #ddd;
      color: #333;
      transition: border-color 0.25s;

      &::placeholder {
        color: #999;
      }

      &:focus {
        border-color: #7d40e7;
      }
    }

    button {
      height: 45px;
      background: #7d40e7;
      border: none;
      border-radius: 4px;
      transition: background 0.2s;

      color: #fff;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;

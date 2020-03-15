import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 120px;
  min-height: calc(100vh - 64px);
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.strong`
  font-size: 24px;
  color: #444;
`;

export const PageController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button + button {
    margin-left: 15px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 30px 30px 30px;
  margin-top: 30px;
  border-radius: 4px;

  background: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    color: #444444;
    font-weight: bold;
    display: block;
    font-size: 16px;
    margin-top: 30px;
    margin-left: 3px;
  }
`;

export const Avatar = styled.img`
  margin-top: 30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export const FormItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AvatarInput = styled.label`
  margin-top: 30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #6e29e4;

  background-size: cover;
  background-image: url(${props => props.image});

  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }
`;

export const Input = styled.input.attrs({
  spellCheck: false,
})`
  width: 100%;
  padding: 12px 30px 12px 15px;
  margin-top: 5px;
  font-size: 16px;
  color: #999;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.25s;

  &:focus {
    border-color: #7d40e7;
  }
`;

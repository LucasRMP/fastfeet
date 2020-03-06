import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 30px 20px;
  height: 64px;

  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  user-select: none;
`;

export const Logo = styled.img.attrs({
  draggable: false,
})`
  width: 135px;
  height: 26px;
  transition: filter 0.25s;

  &:hover {
    filter: brightness(80%);
  }
`;

export const Nav = styled.nav`
  display: flex;
  margin-left: 30px;
  padding-left: 30px;
  border-left: 1px solid #ddd;
  padding: 5px 30px;
`;

export const Link = styled(NavLink).attrs({
  activeStyle: { opacity: 1 },
})`
  font-weight: bolder;
  font-size: 13px;
  letter-spacing: 0;
  text-transform: uppercase;

  opacity: 0.5;
  transition: opacity 0.3s;

  & + a {
    margin-left: 20px;
  }

  &:hover {
    opacity: 1;
  }
`;

export const Profile = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const SignOut = styled.button`
  background: 0;
  border: 0;
  color: #de3b3b;
  font-size: 14px;
  text-transform: lowercase;
  font-weight: bold;
  opacity: 0.75;
  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`;

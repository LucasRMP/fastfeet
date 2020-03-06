import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Logo, Nav, Profile, Name, SignOut } from './styles';
import logo from '~/assets/fastfeet-logo.png';

function Header() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <NavLink to="/dashboard">
        <Logo src={logo} />
      </NavLink>
      <Nav>
        <NavLink to="/dashboard" activeStyle={{ opacity: 1 }}>
          Encomendas
        </NavLink>
        <NavLink to="/deliverymen" activeStyle={{ opacity: 1 }}>
          Entregadores
        </NavLink>
        <NavLink to="/recipients" activeStyle={{ opacity: 1 }}>
          Destinatários
        </NavLink>
        <NavLink to="/problems" activeStyle={{ opacity: 1 }}>
          Problemas
        </NavLink>
      </Nav>
      <Profile>
        <Name>Admin FastFeet</Name>
        <SignOut type="button" onClick={handleSignOut}>
          Sair do sistema
        </SignOut>
      </Profile>
    </Container>
  );
}

export default Header;

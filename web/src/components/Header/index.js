import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Logo, Nav, Link, Profile, Name, SignOut } from './styles';
import logo from '~/assets/fastfeet-logo.png';

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.profile.name);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Logo src={logo} />
      <Nav>
        <Link to="/deliveries" activeStyle={{ opacity: 1 }}>
          Encomendas
        </Link>
        <Link to="/deliverymen" activeStyle={{ opacity: 1 }}>
          Entregadores
        </Link>
        <Link to="/recipients" activeStyle={{ opacity: 1 }}>
          Destinatários
        </Link>
        <Link to="/problems" activeStyle={{ opacity: 1 }}>
          Problemas
        </Link>
      </Nav>
      <Profile>
        <Name>{userName}</Name>
        <SignOut type="button" onClick={handleSignOut}>
          Sair do sistema
        </SignOut>
      </Profile>
    </Container>
  );
}

export default Header;

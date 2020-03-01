import React from 'react';

// import { Container } from './styles';
import logo from '~/assets/fastfeet-logo.png';

function SignIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" />
      <form>
        <label htmlFor="email">Seu e-mail</label>
        <input type="email" id="email" formNoValidate />
      </form>
    </>
  );
}

export default SignIn;

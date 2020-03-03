import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { signInRequest } from '~/store/modules/auth/actions';
import api from '~/services/api';
import logo from '~/assets/fastfeet-logo@2x.png';

const schema = yup.object().shape({
  email: yup
    .string('O email deve ser uma string')
    .email('O email deve ser válido')
    .required('O email é obrigatório'),
  password: yup
    .string('A senha deve ser uma string')
    .required('A senha é obrigatória'),
});

api.post('auth', { email: 'admin@fastfeet.com', password: '123456' });
function SignIn() {
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length) {
      errors.map(error => toast.error(error));
      setErrors([]);
    }
  }, [errors]);

  const handleSubmit = async data => {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <>
      <img draggable={false} src={logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Seu e-mail</label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
        />

        <label htmlFor="password">Sua senha</label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="************"
        />

        <button type="submit">Entrar</button>
      </Form>
    </>
  );
}

export default SignIn;

import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import logo from '~/assets/fastfeet-logo@2x.png';

const schema = yup.object().shape({
  email: yup
    .string('Email must be a string')
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string('Password must be a string')
    .required('Password is required'),
});

function SignIn() {
  const [errors, setErrors] = useState([]);

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

      console.tron.log(data);
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

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import Button from '~/components/Button';

import {
  Container,
  Wrapper,
  Header,
  Title,
  PageController,
  Form,
  AvatarInput,
  FormItem,
  Input,
} from './styles';

function DeliverymanUpdate() {
  const { deliverymanId } = useParams();
  const formRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryman, setDeliveryman] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [errors, setErrors] = useState([]);

  const preview = useMemo(() => {
    if (!avatar) {
      const newAvatar = deliveryman ? deliveryman.avatar : '';
      setAvatar(newAvatar);
      return newAvatar;
    }

    if (typeof avatar === 'string') {
      return avatar;
    }

    return URL.createObjectURL(avatar);
  }, [avatar, deliveryman]);

  useEffect(() => {
    if (errors.length) {
      errors.map(error => toast.error(error));
      setErrors([]);
    }
  }, [errors]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get(`/deliveryman/${deliverymanId}`);

        setName(data.name);
        setEmail(data.email);
        setAvatar(data.avatar ? data.avatar.url : null);
        setDeliveryman({
          name: data.name,
          email: data.email,
          avatar: data.avatar ? data.avatar.url : null,
        });
      } catch (err) {
        toast.error('Ocorreu um erro ao carregar a página');
        history.push('/deliverymen');
      }
    };
    componentDidMount();
  }, [deliverymanId]);

  const handleSubmit = async () => {
    try {
      let avatarId = null;
      if (avatar !== deliveryman.avatar) {
        const data = new FormData();
        data.append('file', avatar);

        const res = await api.post('/files', data);
        avatarId = res.data.id;
      }

      const body = {};
      if (name !== deliveryman.name) {
        body.name = name;
      }

      if (email !== deliveryman.email) {
        body.email = email;
      }

      if (avatarId) {
        body.avatar_id = Number(avatarId);
      }

      await api.put(`/deliveryman/${deliverymanId}`, body);
      toast.success('Perfil atualizado com sucesso');
    } catch (err) {
      toast.error('Não foi possível atualizar o perfil');
    }
  };

  // TODO: Loading screen
  if (!(name || email)) return <></>;

  return (
    <Container>
      <Header>
        <Title>Edição de Entregadores</Title>
        <PageController>
          <Button
            onClick={() => history.push('/deliverymen')}
            icon={MdKeyboardArrowLeft}
            background="#CCCCCC"
            color="#fff"
          >
            Voltar
          </Button>
          <Button
            onClick={handleSubmit}
            icon={MdCheck}
            background="#7D40E7"
            color="#fff"
          >
            Cadastrar
          </Button>
        </PageController>
      </Header>
      <Wrapper>
        <Form ref={formRef} noValidate>
          <AvatarInput
            image={preview || `https://api.adorable.io/avatars/40/${email}.png`}
          >
            <input type="file" onChange={e => setAvatar(e.target.files[0])} />
          </AvatarInput>

          <FormItem>
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormItem>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default DeliverymanUpdate;

import React, { useState, useEffect, useRef } from 'react';
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
  DividedContent,
  FormItem,
  Input,
} from './styles';

function RecipientsUpdate() {
  const { recipientId } = useParams();
  const formRef = useRef();

  const [recipient, setRecipient] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length) {
      errors.map(error => toast.error(error));
      setErrors([]);
    }
  }, [errors]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get(`/recipients/${recipientId}`);
        data.createdAt = null;
        data.updatedAt = null;
        data.compliment = data.compliment ? data.compliment : '';

        setRecipient(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao carregar a página');
        history.push('/recipients');
      }
    };
    componentDidMount();
  }, [recipientId]);

  const handleSubmit = async () => {
    try {
      await api.put(`/recipients/${recipientId}`, recipient);
      toast.success('Destinatário atualizado com sucesso!');
    } catch (err) {
      toast.error('Não foi possível atualizar o destinatário');
    }
  };

  // TODO: Loading screen
  if (!recipient) return <></>;

  return (
    <Container>
      <Header>
        <Title>Edição de Destinatários</Title>
        <PageController>
          <Button
            onClick={() => history.push('/recipients')}
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
          <FormItem>
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              name="name"
              id="name"
              value={recipient.name || ''}
              onChange={e =>
                setRecipient({ ...recipient, name: e.target.value })
              }
            />
          </FormItem>

          <DividedContent>
            <FormItem width="60%">
              <label htmlFor="street">Rua</label>
              <Input
                type="text"
                name="street"
                id="street"
                value={recipient.street || ''}
                onChange={e =>
                  setRecipient({ ...recipient, street: e.target.value })
                }
              />
            </FormItem>
            <FormItem width="20%">
              <label htmlFor="number">Número</label>
              <Input
                type="text"
                name="number"
                id="number"
                value={recipient.number || ''}
                onChange={e =>
                  setRecipient({ ...recipient, number: e.target.value })
                }
              />
            </FormItem>
            <FormItem width="20%">
              <label htmlFor="compliment">Complemento</label>
              <Input
                type="text"
                name="compliment"
                id="compliment"
                value={recipient.compliment || ''}
                onChange={e =>
                  setRecipient({ ...recipient, compliment: e.target.value })
                }
              />
            </FormItem>
          </DividedContent>

          <DividedContent>
            <FormItem>
              <label htmlFor="city">Cidade</label>
              <Input
                type="text"
                name="city"
                id="city"
                value={recipient.city || ''}
                onChange={e =>
                  setRecipient({ ...recipient, city: e.target.value })
                }
              />
            </FormItem>
            <FormItem>
              <label htmlFor="state">Estado</label>
              <Input
                type="text"
                name="state"
                id="state"
                value={recipient.state || ''}
                onChange={e =>
                  setRecipient({ ...recipient, state: e.target.value })
                }
              />
            </FormItem>
            <FormItem>
              <label htmlFor="postal_code">CEP</label>
              <Input
                type="number"
                name="postal_code"
                id="postal_code"
                value={recipient.postal_code || ''}
                onChange={e =>
                  setRecipient({ ...recipient, postal_code: e.target.value })
                }
              />
            </FormItem>
          </DividedContent>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default RecipientsUpdate;

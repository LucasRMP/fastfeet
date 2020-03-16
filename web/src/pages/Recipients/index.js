import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdDeleteForever, MdEdit } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { formatId } from '~/utils/format';

import Actions from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';

import {
  Container,
  Header,
  Title,
  PageController,
  RecipientsTable,
  ActionsContainer,
} from './styles';

function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get('/recipients');
        console.tron.log({ data });
        setRecipients(
          data.recipients.map(recipient => ({
            ...recipient,
            formattedId: formatId(recipient.id),
          }))
        );
      } catch (err) {
        toast.error('Não foi possivel carregar as entregas');
      }
    };

    componentDidMount();
  }, []);

  const handleDelete = async id => {
    try {
      const { data } = await api.delete(`/recipients/${id}`);
      setRecipients(
        recipients.map(deliveryman => {
          if (deliveryman.id === id) {
            return {
              ...data.deliveryman,
              formattedId: formatId(data.deliveryman.id),
            };
          }
          return deliveryman;
        })
      );

      toast.success('Destinatario excluido com sucesso!');
    } catch (err) {
      toast.error('Não foi possível excluir o destinatario');
    }
  };

  const handleEdit = id => {
    history.push(`/recipients/${id}`);
  };

  // TODO: Load screen
  if (!recipients) return <></>;

  return (
    <Container>
      <Header>
        <Title>Gerenciando Destinatários</Title>
        <PageController>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            action={() => console.log(search)}
            placeholder="Buscar por encomendas"
            icon={MdSearch}
          />
          <Button
            onClick={() => console.log('btn pressed')}
            icon={MdAdd}
            background="#7D40E7"
            color="#fff"
          >
            Cadastrar
          </Button>
        </PageController>
      </Header>

      <RecipientsTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              {console.log(recipient)}
              <td>{recipient.formattedId}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
              </td>
              <ActionsContainer>
                <Actions
                  options={[
                    {
                      text: 'Editar',
                      icon: <MdEdit color="#4D85EE" />,
                      action: () => handleEdit(recipient.id),
                    },
                    {
                      text: 'Excluir',
                      icon: <MdDeleteForever color="#DE3B3B" />,
                      action: () => handleDelete(recipient.id),
                    },
                  ]}
                />
              </ActionsContainer>
            </tr>
          ))}
        </tbody>
      </RecipientsTable>
    </Container>
  );
}

export default Recipients;

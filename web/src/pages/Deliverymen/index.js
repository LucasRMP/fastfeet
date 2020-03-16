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
  DeliverymenTable,
  Avatar,
  ActionsContainer,
} from './styles';

function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get('/deliveryman');
        setDeliverymen(
          data.deliverymans.map(deliveryman => ({
            ...deliveryman,
            formattedId: formatId(deliveryman.id),
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
      const { data } = await api.delete(`/deliveryman/${id}`);
      setDeliverymen(
        deliverymen.map(deliveryman => {
          if (deliveryman.id === id) {
            return {
              ...data.deliveryman,
              formattedId: formatId(data.deliveryman.id),
            };
          }
          return deliveryman;
        })
      );

      toast.success('Entrega cancelada com sucesso!');
    } catch (err) {
      toast.error('Não foi possível cancelar a entrega');
    }
  };

  const handleEdit = id => {
    history.push(`/deliverymen/${id}`);
  };

  // TODO: Load screen
  if (!deliverymen) return <></>;

  return (
    <Container>
      <Header>
        <Title>Gerenciando Entregadores</Title>
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

      <DeliverymenTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>{deliveryman.formattedId}</td>
              <Avatar>
                <img
                  src={
                    deliveryman.avatar
                      ? deliveryman.avatar.url
                      : `https://api.adorable.io/avatars/40/${deliveryman.email}.png`
                  }
                  alt={deliveryman.name}
                />
              </Avatar>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <ActionsContainer>
                <Actions
                  options={[
                    {
                      text: 'Editar',
                      icon: <MdEdit color="#4D85EE" />,
                      action: () => handleEdit(deliveryman.id),
                    },
                    {
                      text: 'Excluir',
                      icon: <MdDeleteForever color="#DE3B3B" />,
                      action: () => handleDelete(deliveryman.id),
                    },
                  ]}
                />
              </ActionsContainer>
            </tr>
          ))}
        </tbody>
      </DeliverymenTable>
    </Container>
  );
}

export default Deliverymen;

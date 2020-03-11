import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdSearch,
  MdVisibility,
  MdDeleteForever,
  MdEdit,
} from 'react-icons/md';

import api from '~/services/api';

import { formatId, dateToLocale } from '~/utils/format';
import { getStatus } from '~/utils/status';

import Actions from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Popup from '~/components/PopUp';

import {
  Container,
  Header,
  Title,
  PageController,
  DeliveryTable,
  Deliveryman,
  Status,
  ActionsContainer,
  DeliveryInfo,
  DeliveryTitle,
  DeliveryDates,
  DeliverySignature,
} from './styles';

function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get('delivery');
        setDeliveries(
          data.map(delivery => ({
            ...delivery,
            status: getStatus(delivery),
            formattedId: formatId(delivery.id),
            formattedStartDate: delivery.start_date
              ? dateToLocale(delivery.start_date)
              : '—',
            formattedEndDate: delivery.end_date
              ? dateToLocale(delivery.end_date)
              : '—',
            formattedCanceledAt: delivery.canceled_at
              ? dateToLocale(delivery.canceled_at)
              : '—',
          }))
        );
      } catch (err) {
        console.tron.error(err);
        toast.error('Não foi possivel carregar as entregas');
      }
    };

    componentDidMount();
  }, []);

  const handleOpenPopup = delivery => {
    setSelectedDelivery(delivery);
    setIsOpenedPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedDelivery(null);
    setIsOpenedPopup(false);
  };

  return (
    <Container>
      {selectedDelivery && (
        <Popup onClose={handleClosePopup} opened={isOpenedPopup}>
          <DeliveryInfo>
            {console.tron.log(selectedDelivery)}
            <DeliveryTitle>Informações da encomenda</DeliveryTitle>
            <p>
              {selectedDelivery.recipient.street},{' '}
              {selectedDelivery.recipient.number}
            </p>
            <p>
              {selectedDelivery.recipient.city} -{' '}
              {selectedDelivery.recipient.state}
            </p>
            <p>74810-160</p>
          </DeliveryInfo>
          <DeliveryDates>
            <DeliveryTitle>Datas</DeliveryTitle>

            <p>
              <span>Entrega: </span>
              {selectedDelivery.formattedEndDate}
            </p>
            <p>
              <span>Retirada: </span>
              {selectedDelivery.formattedStartDate}
            </p>
            <p>
              <span>Cancelada em: </span>
              {selectedDelivery.formattedCanceledAt}
            </p>
          </DeliveryDates>

          {selectedDelivery.signature && (
            <DeliverySignature>
              <DeliveryTitle>Assinatura do destinatário</DeliveryTitle>
              <img
                src="http://localhost:3333/files/6b0180035bd03111e59541f60f25a430.png"
                alt="signature"
              />
            </DeliverySignature>
          )}
        </Popup>
      )}
      <Header>
        <Title>Gerenciando Encomendas</Title>
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

      <DeliveryTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>{delivery.formattedId}</td>
              <td>{delivery.recipient.name}</td>
              <Deliveryman>
                <img
                  src={
                    delivery.deliveryman.avatar
                      ? delivery.deliveryman.avatar.url
                      : `https://api.adorable.io/avatars/40/${delivery.deliveryman.email}.png`
                  }
                  alt={delivery.deliveryman.name}
                />
                <strong>{delivery.deliveryman.name}</strong>
              </Deliveryman>
              <td>{delivery.recipient.city}</td>
              <td>{delivery.recipient.state}</td>
              <td>
                <Status status={delivery.status}>
                  <span />
                  {delivery.status.text}
                </Status>
              </td>
              <ActionsContainer>
                <Actions
                  options={[
                    {
                      text: 'Visualizar',
                      icon: <MdVisibility color="#8E5BE8" />,
                      action: () => handleOpenPopup(delivery),
                    },
                    {
                      text: 'Editar',
                      icon: <MdEdit color="#4D85EE" />,
                      action: () => console.log('Editar'),
                    },
                    {
                      text: 'Excluir',
                      icon: <MdDeleteForever color="#DE3B3B" />,
                      action: () => console.log('Excluir'),
                    },
                  ]}
                />
              </ActionsContainer>
            </tr>
          ))}
        </tbody>
      </DeliveryTable>
    </Container>
  );
}

export default Dashboard;

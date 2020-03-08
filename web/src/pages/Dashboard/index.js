import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { formatId } from '~/utils/format';
import { getStatus } from '~/utils/status';

import { Container, DeliveryTable, Deliveryman, Status } from './styles';

function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const { data } = await api.get('delivery');

        console.tron.log(data);

        setDeliveries(
          data.map(delivery => ({
            ...delivery,
            formattedId: formatId(delivery.id),
            status: getStatus(delivery),
          }))
        );
      } catch (err) {
        toast.error('Não foi possivel carregar as entregas');
      }
    };

    componentDidMount();
  }, []);

  return (
    <Container>
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
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </DeliveryTable>
    </Container>
  );
}

export default Dashboard;

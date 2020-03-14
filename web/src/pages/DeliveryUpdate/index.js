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
  Select,
  Option,
} from './styles';

function DeliveryUpdate() {
  const { deliveryId } = useParams();
  const formRef = useRef();

  const [delivery, setDelivery] = useState(null);
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
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
        const { data } = await api.get(`/delivery/${deliveryId}`);
        const deliverymenRes = await api.get('/deliveryman');
        const recipientRes = await api.get('/recipients');

        setDelivery({
          deliveryman_id: data.deliveryman.id,
          recipient_id: data.recipient.id,
          product: data.product,
        });
        setDeliverymen(deliverymenRes.data.deliverymans);
        setRecipients(recipientRes.data.recipients);
      } catch (err) {
        console.tron.error(err);
        toast.error('Ocorreu um erro ao carregar a página');
        history.push('/deliveries');
      }
    };
    componentDidMount();
  }, [deliveryId]);

  useEffect(() => {
    console.tron.log({ delivery });
  }, [delivery]);

  const handleSubmit = async () => {
    const res = await api.put(`/delivery/${deliveryId}`, delivery);

    console.tron.log({ res });
  };

  // TODO: Loading screen
  if (!delivery) return <></>;

  return (
    <Container>
      <Header>
        <Title>Edição de encomendas</Title>
        <PageController>
          <Button
            onClick={() => history.push('/deliveries')}
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
          <DividedContent>
            <FormItem>
              <label htmlFor="recipient">Destinatário</label>
              <Select
                name="recipient"
                id="recipient"
                value={delivery.recipient_id}
                onChange={e =>
                  setDelivery({ ...delivery, recipient_id: e.target.value })
                }
              >
                {recipients &&
                  recipients.map(recipient => (
                    <Option key={String(recipient.id)} value={recipient.id}>
                      {recipient.name}
                    </Option>
                  ))}
              </Select>
            </FormItem>

            <FormItem>
              <label htmlFor="deliveryman">Entregador</label>
              <Select
                name="deliveryman"
                id="deliveryman"
                value={delivery.deliveryman_id}
                onChange={e =>
                  setDelivery({ ...delivery, deliveryman_id: e.target.value })
                }
              >
                {deliverymen &&
                  deliverymen.map(deliveryman => (
                    <Option key={String(deliveryman.id)} value={deliveryman.id}>
                      {deliveryman.name}
                    </Option>
                  ))}
              </Select>
            </FormItem>
          </DividedContent>

          <FormItem>
            <label htmlFor="product">Nome do produto</label>
            <Input
              type="text"
              name="product"
              id="product"
              value={delivery.product}
              onChange={e =>
                setDelivery({ ...delivery, product: e.target.value })
              }
            />
          </FormItem>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default DeliveryUpdate;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdDeleteForever, MdEdit } from 'react-icons/md';

import api from '~/services/api';

import { formatId } from '~/utils/format';

import Actions from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Popup from '~/components/PopUp';

import {
  Container,
  Header,
  Title,
  PageController,
  ProblemsTable,
  ActionsContainer,
  PopupContainer,
  ProblemTitle,
  ProblemDescription,
} from './styles';

function Problems() {
  const [selectedProblem, setSelectedProblem] = useState({});
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const res = await api.get('/problems');

        const idsWithProblems = res.data.map(delivery => delivery.id);

        const results = idsWithProblems.map(async id =>
          api.get(`/delivery/${id}/problems`)
        );

        Promise.all(results).then(response => {
          const newProblems = [];

          response.map(({ data }) =>
            data.map(problem =>
              newProblems.push({
                ...problem,
                formattedDeliveryId: formatId(problem.delivery.id),
              })
            )
          );

          setProblems(newProblems);
        });
      } catch (err) {
        toast.error('Não foi possivel carregar as entregas');
      }
    };

    componentDidMount();
  }, []);

  const handleCancel = async id => {
    try {
      await api.patch(`/problem/${id}/cancel-delivery`);

      toast.success('Entrega cancelada com sucesso!');
    } catch (err) {
      toast.error('Não foi possível cancelar a entrega');
    }
  };

  const handleOpenPopup = problem => {
    setSelectedProblem(problem);
    setIsOpenedPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedProblem(null);
    setIsOpenedPopup(false);
  };

  // TODO: Load screen
  if (!problems) return <></>;

  return (
    <>
      <Container>
        <Header>
          <Title>Problemas na Entrega</Title>
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

        <ProblemsTable>
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {console.tron.log({ problems, path: 'render' })}
            {problems &&
              problems.map(problem => (
                <tr key={problem.id}>
                  <td>{problem.formattedDeliveryId}</td>
                  <td>{problem.description}</td>
                  <ActionsContainer>
                    <Actions
                      options={[
                        {
                          text: 'Visualizar',
                          icon: <MdEdit color="#4D85EE" />,
                          action: () => handleOpenPopup(problem),
                        },
                        {
                          text: 'Cancelar entrega',
                          icon: <MdDeleteForever color="#DE3B3B" />,
                          action: () => handleCancel(problem.id),
                        },
                      ]}
                    />
                  </ActionsContainer>
                </tr>
              ))}
          </tbody>
        </ProblemsTable>
      </Container>
      {selectedProblem && (
        <Popup onClose={handleClosePopup} opened={isOpenedPopup}>
          <PopupContainer>
            <ProblemTitle>Visualizar um problema</ProblemTitle>
            <ProblemDescription>
              {selectedProblem.description}
            </ProblemDescription>
          </PopupContainer>
        </Popup>
      )}
    </>
  );
}

export default Problems;

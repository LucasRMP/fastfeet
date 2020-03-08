import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 60px;
  min-height: calc(100vh - 64px);
`;

export const Title = styled.strong`
  font-size: 24px;
  color: #444;
  margin-bottom: 30px;
`;

export const PageController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeliveryTable = styled.table`
  flex-direction: column;
  flex: 1;
  max-width: 1200px;
  height: 100%;
  border-spacing: 0 30px;

  thead th {
    padding-left: 25px;
    color: #444;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }

  tbody td {
    padding: 20px 25px;
    background: #fff;
    border: none;
    vertical-align: middle;
    border-radius: 4px;

    font-size: 16px;
    line-height: 20px;
    color: #666;

    tr {
      margin-bottom: 30px;
    }
  }
`;

export const Deliveryman = styled.td`
  display: flex;
  align-items: center;
  img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  strong {
    font-weight: normal;
    margin-left: 10px;
  }
`;

export const Status = styled.div`
  display: inline-block;
  padding: 3px 5px;
  border-radius: 12px;

  color: ${props => props.status.color};
  background: ${props => props.status.background};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;

  span {
    display: inline-block;
    margin-right: 5px;
    border: 5px solid ${props => props.status.color};
    border-radius: 50%;
  }
`;

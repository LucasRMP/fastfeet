import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 120px;
  min-height: calc(100vh - 64px);
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  height: 100%;
  width: 100%;
  border-spacing: 0 30px;

  thead th {
    padding-left: 25px;
    color: #444;
    text-align: left;
    font-size: 16px;
    font-weight: bold;

    &:last-of-type {
      padding-left: 0;
      text-align: center;
    }
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

export const ActionsContainer = styled.td`
  width: 80px;
  svg {
    cursor: pointer;
  }
`;

export const DeliveryTitle = styled.strong`
  display: block;
  font-size: 14px;
  color: #444;
  margin-bottom: 5px;
`;

export const DeliveryInfo = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #666;
  line-height: 20px;
`;

export const DeliveryDates = styled.div`
  border-bottom: 1px solid #eee;
  color: #666;
  line-height: 20px;

  span {
    font-weight: bold;
  }
`;

export const DeliverySignature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    margin-bottom: 10px;
    width: 100%;
  }

  img {
    width: 234px;
    height: 36px;
  }
`;

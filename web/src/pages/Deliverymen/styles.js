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

export const DeliverymenTable = styled.table`
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

export const Avatar = styled.td`
  display: flex;
  align-items: center;
  img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 1px solid #eee;
  }
`;

export const ActionsContainer = styled.td`
  width: 80px;
  svg {
    cursor: pointer;
  }
`;

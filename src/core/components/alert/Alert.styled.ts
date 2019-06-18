import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  right: 20px;
  bottom: 10px;

  display: flex;
  flex-direction: column-reverse;
`;

export const Item = styled.div<{ type: 'success' | 'danger' | 'warning' }>`
  padding: 10px 20px;
  margin-bottom: 10px;

  color: ${({ theme }) => theme.base.white};

  background: ${({ theme, type }) => theme.alerts[type]};
`;

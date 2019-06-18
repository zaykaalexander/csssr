import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

export const Empty = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.base.dark};
  background: ${({ theme }) => theme.base.white};
  font-size: ${rem('20px')};
`;

export const Loader = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.7;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  color: ${({ theme }) => theme.base.dark};
  background: ${({ theme }) => theme.base.white};
  font-size: ${rem('20px')};
`;

export const Items = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
`;

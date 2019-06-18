import styled from 'styled-components';
import { rgba } from 'polished';

export const Menu = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: ${({ y }) => y + 10}px;
  left: ${({ x }) => x}px;
  background-color: #fff;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 10px 10px 30px ${({ theme }) => rgba(theme.base.dark, 0.4)};
`;

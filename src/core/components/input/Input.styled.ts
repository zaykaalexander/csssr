import styled from 'styled-components';
import { rgba } from 'polished';

export const Component = styled.input`
  border: 3px solid ${({ theme }) => rgba(theme.base.blue, 0.5)};

  height: 50px;

  padding: 0 25px;
  font-weight: bold;

  border-radius: 25px;

  &:focus {
    border-color: ${({ theme }) => theme.base.blue};
  }
`;

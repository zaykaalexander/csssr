import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.a`
  display: flex;
  align-items: center;

  margin: 30px 0;

  text-decoration: none;

  .user {
    &__avatar {
      width: 60px;
      height: 60px;

      border-radius: 50%;
    }

    &__login {
      font-size: ${rem('18px')};
      margin-left: 10px;
      color: ${({ theme }) => theme.base.dark};
    }
  }
`;

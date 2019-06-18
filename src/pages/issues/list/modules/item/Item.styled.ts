import styled from 'styled-components';
import { rem, rgba } from 'polished';

export const Container = styled.article`
  display: flex;
  flex-direction: column;

  padding: 20px 40px;
  margin: 10px 20px;

  box-shadow: 0 0 20px ${({ theme }) => rgba(theme.base.dark, 0.1)};

  background: ${({ theme }) => theme.base.white};

  .issue {
    &__number {
      color: ${({ theme }) => theme.issue.number};
      font-size: ${rem('13px')};
    }

    &__title {
      margin: 15px 0 5px;

      color: ${({ theme }) => theme.issue.title};
      font-size: ${rem('20px')};
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: ${({ theme }) => theme.base.blue};
      }
    }

    &__date {
      color: ${({ theme }) => theme.issue.date};
      font-size: ${rem('12px')};
    }
  }
`;

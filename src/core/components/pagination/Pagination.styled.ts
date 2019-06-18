import styled from 'styled-components';
import { darken, rem, rgba } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 20px 40px;
  background: ${({ theme }) => darken(0.01, theme.base.white)};
  border-top: 1px solid ${({ theme }) => theme.base.dark};

  .pagination {
    &__button {
      height: 40px;
      padding: 0 20px;

      background: ${({ theme }) => theme.base.white};
      border: 1px solid ${({ theme }) => theme.base.blue};

      border-radius: 20px;

      cursor: pointer;

      &:not(:disabled):hover {
        color: ${({ theme }) => theme.base.white};
        background: ${({ theme }) => theme.base.blue};
      }

      &:disabled {
        border-color: ${({ theme }) => rgba(theme.base.dark, 0.3)};
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    &__limit {
      margin: 0 auto;
    }
  }

  .limit {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__variation {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 30px;
      height: 30px;

      margin-left: 10px;

      font-size: ${rem('12px')};

      background: none;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => rgba(theme.base.dark, 0.3)};

      cursor: pointer;

      &:hover,
      &.active {
        color: ${({ theme }) => theme.base.white};
        border: 1px solid ${({ theme }) => theme.base.blue};
        background: ${({ theme }) => theme.base.blue};
      }
    }
  }
`;

import styled from 'styled-components';
import { linearGradient, rgba } from 'polished';

export const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.base.background};
`;

export const Screen = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;

  padding: 30px;

  .screen {
    &__title {
      margin-bottom: 20px;

      text-align: center;
      color: ${({ theme }) => theme.base.dark};
    }

    &__content {
      display: flex;
      flex-direction: column;
    }

    &__footer {
      display: flex;
      align-items: center;

      height: 50px;

      margin-top: 20px;
    }

    &__button {
      cursor: pointer;
      border: 0;

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }

    &__prev {
      margin-right: auto;

      background: none;

      color: ${({ theme }) => rgba(theme.base.dark, 0.4)};

      &:hover {
        color: ${({ theme }) => rgba(theme.base.dark, 0.6)};
      }
    }

    &__next {
      width: 200px;
      height: 50px;

      border-radius: 25px;

      margin-left: auto;

      color: ${({ theme }) => theme.base.white};
      background: ${({ theme }) => theme.base.blue};

      &:not(:disabled):hover {
        background: ${({ theme }) => rgba(theme.base.blue, 0.8)};
      }
    }
  }
`;

export const Item = styled.div<{ highlighted: boolean }>`
  cursor: pointer;

  padding: 5px 10px;

  color: ${({ highlighted, theme }) => (highlighted ? theme.base.white : theme.base.dark)};
  background: ${({ highlighted, theme }) => (highlighted ? theme.base.blue : theme.base.white)};

  &:hover {
    color: ${({ theme }) => theme.base.white};
    background: ${({ theme }) => theme.base.blue};
  }
`;

import styled from 'styled-components';
import { rem, rgba } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1000px;
  padding: 60px 30px;
  margin: 0 auto;

  .issue {
    &__title {
      margin-bottom: 20px;
    }

    &__body {
      padding: 30px;

      box-shadow: 0 0 20px ${({ theme }) => rgba(theme.base.dark, 0.1)};

      font-size: ${rem('14px')};
      line-height: 1.7;

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 20px;
      }

      p {
        margin: 5px;
      }

      pre {
        margin: 20px 0;
        padding: 20px 40px;
        background: ${({ theme }) => theme.base.blue};
        color: ${({ theme }) => theme.base.white};
        overflow-x: auto;
      }

      ol,
      ul {
        list-style-position: inside;
        margin-bottom: 10px;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
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

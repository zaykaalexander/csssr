import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { configureStore } from '~/redux/store';
import routing from '~/routing';
import { theme, Global } from '~/theme';
import { Alert } from '~/components';

export const App = () => (
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <>
        <Global />
        <Alert />
        <BrowserRouter>{routing}</BrowserRouter>
      </>
    </ThemeProvider>
  </Provider>
);

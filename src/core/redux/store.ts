import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';
import rootEpic from './epic';

export const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
};

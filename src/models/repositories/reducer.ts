import * as constants from './constants';
import { RepositoryModel } from './models';
import { GetRepositoriesType, GetRepositoriesFailType, GetRepositoriesFinishType } from './actions';
import { AxiosError } from 'axios';

export type RepositoriesActionType =
  | GetRepositoriesType
  | GetRepositoriesFailType
  | GetRepositoriesFinishType;

export type RepositoriesReducerStateType = {
  list: {
    status?: string;
    error?: AxiosError;
    items: RepositoryModel[];
  };
};

const initialState: RepositoriesReducerStateType = {
  list: {
    items: [],
  },
};

export default (state = initialState, action: RepositoriesActionType) => {
  switch (action.type) {
    case constants.GET_REPOSITORIES:
      return { ...state, list: { ...state.list, status: 'LOADING', error: undefined } };
    case constants.GET_REPOSITORIES_FAIL:
      return { ...state, list: { ...state.list, status: 'FAIL', error: action.error } };
    case constants.GET_REPOSITORIES_FINISH:
      return { ...state, list: { ...state.list, status: 'LOADED', items: action.repositories } };
    default:
      return state;
  }
};

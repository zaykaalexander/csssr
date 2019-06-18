import * as constants from './constants';
import { UserModel } from './models';
import { GetUsersFailType, GetUsersFinishType, GetUsersType } from './actions';
import { AxiosError } from 'axios';

export type UsersActionType = GetUsersType | GetUsersFailType | GetUsersFinishType;

export type UsersReducerStateType = {
  list: {
    status?: string;
    error?: AxiosError;
    items: UserModel[];
  };
};

const initialState: UsersReducerStateType = {
  list: {
    items: [],
  },
};

export default (state = initialState, action: UsersActionType) => {
  switch (action.type) {
    case constants.GET_USERS:
      return { ...state, list: { ...state.list, status: 'LOADING', error: undefined } };
    case constants.GET_USERS_FAIL:
      return { ...state, list: { ...state.list, status: 'FAIL', error: action.error } };
    case constants.GET_USERS_FINISH:
      return { ...state, list: { ...state.list, status: 'LOADED', items: action.users } };
    default:
      return state;
  }
};

import * as constants from './constants';
import { UserModel } from './models';
import { AxiosError } from 'axios';

/*== GET USERS ==*/
export type GetUsersType = {
  type: typeof constants.GET_USERS;
  query: string;
};

export const getUsers = (query: string) => ({
  type: constants.GET_USERS,
  query,
});

/*== GET USERS FAIL ==*/
export type GetUsersFailType = {
  type: typeof constants.GET_USERS_FAIL;
  error: string;
};

export const getUsersFail = (error: AxiosError) => ({
  type: constants.GET_USERS_FAIL,
  error,
});

/*== GET USERS FINISH ==*/
export type GetUsersFinishType = {
  type: typeof constants.GET_USERS_FINISH;
  users: UserModel[];
};
export type GetUsersFinishResultType = {
  items: UserModel[];
};
export const getUsersFinish = (result: GetUsersFinishResultType) => ({
  type: constants.GET_USERS_FINISH,
  users: result.items,
});

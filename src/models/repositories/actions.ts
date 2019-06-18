import * as constants from './constants';
import { RepositoryModel } from './models';
import { AxiosError } from 'axios';

/*== GET REPOSITORIES ==*/
export type GetRepositoriesType = {
  type: typeof constants.GET_REPOSITORIES;
  user: string;
};

export const getRepositories = (user: string) => ({
  type: constants.GET_REPOSITORIES,
  user,
});

/*== GET REPOSITORIES FAIL ==*/
export type GetRepositoriesFailType = {
  type: typeof constants.GET_REPOSITORIES_FAIL;
  error: string;
};

export const getRepositoriesFail = (error: AxiosError) => ({
  type: constants.GET_REPOSITORIES_FAIL,
  error,
});

/*== GET REPOSITORIES FINISH ==*/
export type GetRepositoriesFinishType = {
  type: typeof constants.GET_REPOSITORIES_FINISH;
  repositories: RepositoryModel[];
};
export const getRepositoriesFinish = (repositories: RepositoryModel[]) => ({
  type: constants.GET_REPOSITORIES_FINISH,
  repositories,
});

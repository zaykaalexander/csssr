import { combineReducers } from 'redux';

import users, { UsersReducerStateType } from '^/users/reducer';
import repositories, { RepositoriesReducerStateType } from '^/repositories/reducer';
import issues, { IssuesReducerStateType } from '^/issues/reducer';

export type RootReducerType = {
  users: UsersReducerStateType;
  repositories: RepositoriesReducerStateType;
  issues: IssuesReducerStateType;
};

export default combineReducers<any>({
  users,
  repositories,
  issues,
});

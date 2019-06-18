import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { RootReducerType } from '~/redux/reducer';
import { useRemember } from '~/hooks';

import { getUsers } from '^/users/actions';
import { getRepositories } from '^/repositories/actions';

import { Form, Item } from './IssuesForm.styled';
import { Screens } from '../issues-form/Screens.component';
import { Autocomplete } from '~/components';
import { UsersReducerStateType } from '^/users/reducer';
import { RepositoriesReducerStateType } from '^/repositories/reducer';

export type IssuesFormStateProps = {
  users: UsersReducerStateType;
  repositories: RepositoriesReducerStateType;
};

export type IssuesFormDispatchProps = {
  getUsers: (query: string) => void;
  getRepositories: (user: string) => void;
};

export type IssuesFormProps = IssuesFormStateProps &
  IssuesFormDispatchProps & {
    onSelect: (user: string, repository: string) => void;
  };

const IssuesFormComponent: React.FunctionComponent<IssuesFormProps> = (props) => {
  const { users, repositories, getUsers, onSelect, getRepositories } = props;

  const [userValue, setUserValue, user, setUser] = useRemember('');
  const [repositoryValue, setRepositoryValue, repository, setRepository] = useRemember('');

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUser(undefined);
    setUserValue(query);
    getUsers(query);
  };

  const handleSelectUser = (user: string) => {
    setUserValue(user);
    setUser(user);
    getRepositories(user);
  };

  const handleChangeRepository = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepository(undefined);
    setRepositoryValue(e.target.value);
  };

  const handleSelectRepository = (repository: string) => {
    setRepositoryValue(repository);
    setRepository(repository);
  };

  const handleSelect = () => {
    onSelect(user, repository);
  };

  return (
    <Form>
      <Screens
        items={[
          {
            title: 'Choose user',
            render: (
              <Autocomplete
                sortable
                keyValue="login"
                value={userValue}
                items={users.list.items}
                onChange={handleChangeUser}
                onSelect={(item) => handleSelectUser(item.login)}
                renderItem={(item, highlighted) => (
                  <Item highlighted={highlighted}>{item.login}</Item>
                )}
              />
            ),
            nextText: 'Choose repository',
            canNext: () => !!user,
          },
          {
            title: 'Choose repository',
            render: (
              <Autocomplete
                sortable
                keyValue="name"
                value={repositoryValue}
                items={repositories.list.items}
                onChange={handleChangeRepository}
                onSelect={(item) => handleSelectRepository(item.name)}
                renderItem={(item, highlighted) => (
                  <Item highlighted={highlighted}>{item.name}</Item>
                )}
              />
            ),
            nextText: 'Find',
            canNext: () => !!repository,
          },
        ]}
        onSelect={handleSelect}
      />
    </Form>
  );
};

export const IssuesForm = hot(module)(
  connect<IssuesFormStateProps, IssuesFormDispatchProps, {}, RootReducerType>(
    (state) => ({
      users: state.users,
      repositories: state.repositories,
    }),
    (dispatch) => ({
      getUsers: (query: string) => dispatch(getUsers(query)),
      getRepositories: (user: string) => dispatch(getRepositories(user)),
    }),
  )(IssuesFormComponent),
);

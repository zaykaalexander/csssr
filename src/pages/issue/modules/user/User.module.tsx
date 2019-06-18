import * as React from 'react';
import { UserModel } from '^/users/models';

import { Container } from './User.styled';

export type UserProps = {
  user: UserModel;
};

export const User: React.FunctionComponent<UserProps> = (props) => {
  const { user } = props;

  return (
    <Container href={user.html_url} className="user" target="_blank">
      <img className="user__avatar" alt={user.login} src={user.avatar_url} />
      <div className="user__login">{user.login}</div>
    </Container>
  );
};

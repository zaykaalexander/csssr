import * as React from 'react';
import queryString from 'query-string';
import { RouteConfigComponentProps } from 'react-router-config';

import { Page } from '~/hoc';

import { List } from './modules';

export type IssuesListPageParamsType = {
  user: string;
  repository: string;
};

export type IssuesListPageProps = RouteConfigComponentProps<IssuesListPageParamsType> & {};

const IssuesListPageComponent: React.FunctionComponent<IssuesListPageProps> = (props) => {
  const { match, location } = props;

  const { user, repository } = match.params;

  const { page, limit } = queryString.parse(location.search);

  const handleOnChange = (page: number, limit: number) => {
    const params = queryString.stringify({ page, limit });
    window.history.replaceState('', '', `${match.url}?${params}`);
  };

  return (
    <List
      user={user}
      repository={repository}
      page={page ? parseInt(page as string, 10) : undefined}
      limit={limit ? parseInt(limit as string, 10) : undefined}
      onChange={handleOnChange}
    />
  );
};

export const IssuesListPage = Page(IssuesListPageComponent);

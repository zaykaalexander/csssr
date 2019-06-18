import * as React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';

import { Page } from '~/hoc';

import { Issue } from './modules';
import { alerts, alerts$ } from '~/components';

export type IssuePageProps = RouteConfigComponentProps<{
  user: string;
  repository: string;
  issue: string;
}>;

const IssuePageComponent: React.FunctionComponent<IssuePageProps> = (props) => {
  const {
    match: {
      params: { user, repository, issue },
    },
  } = props;

  alerts$.next({ type: 'danger', message: 'Hello', timeout: 2000 });

  return <Issue user={user} repository={repository} issueNumber={parseInt(issue, 10)} />;
};

export const IssuePage = Page(IssuePageComponent);

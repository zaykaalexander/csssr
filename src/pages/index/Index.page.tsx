import * as React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';

import { Page } from '~/hoc';

import { IssuesForm } from './modules';

export type IndexPageProps = RouteConfigComponentProps;

const IndexPageComponent: React.FunctionComponent<IndexPageProps> = (props) => {
  const openIssues = (user: string, repository: string) =>
    props.history.push(`/${user}/${repository}/issues`);

  return <IssuesForm onSelect={openIssues} />;
};

export const IndexPage = Page(IndexPageComponent);

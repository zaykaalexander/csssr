import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import moment from 'moment';
import Markdown from 'react-markdown';

import { IssuesItemType } from '^/issues/reducer';
import { RootReducerType } from '~/redux/reducer';
import { getIssue } from '^/issues/actions';

import { User } from '../';

import { Container, Loader } from './Issue.styled';

export type IssueStateProps = {
  issue: IssuesItemType;
};

export type IssueDispatchProps = {
  getIssue: (user: string, repository: string, issue: number) => void;
};

export type IssueParentProps = {
  user: string;
  repository: string;
  issueNumber: number;
};

export type IssueProps = IssueStateProps & IssueDispatchProps & IssueParentProps;

const IssueComponent: React.FunctionComponent<IssueProps> = (props) => {
  const { user, repository, issueNumber, getIssue, issue } = props;

  React.useEffect(() => {
    getIssue(user, repository, issueNumber);
  }, []);

  if (issue.status === 'LOADING') return <Loader>Loading</Loader>;

  if (!issue.item) return null;

  return (
    <Container className="issue">
      <h1 className="issue__title">{issue.item.title}</h1>
      <div className="issue__date">
        Created: {moment(issue.item.created_at).format('DD MMM YYYY')}
      </div>
      <User user={issue.item.user} />
      <div className="issue__body">
        <Markdown source={issue.item.body} />
      </div>
    </Container>
  );
};

export const Issue = hot(module)(
  connect<IssueStateProps, IssueDispatchProps, {}, RootReducerType>(
    (state) => ({
      issue: state.issues.issue,
    }),
    (dispatch) => ({
      getIssue: (user: string, repository: string, issue: number) =>
        dispatch(getIssue(user, repository, issue)),
    }),
  )(IssueComponent),
);

import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { getIssues } from '^/issues/actions';
import { IssuesListType } from '^/issues/reducer';
import { RootReducerType } from '~/redux/reducer';

import { Item } from '../item';

import { Container, Empty, Loader, Items } from './List.styled';
import { Pagination } from '~/components';

export type ListStateProps = {
  issues: IssuesListType;
};

export type ListDispatchProps = {
  getIssues: (user: string, repository: string, page?: number, limit?: number) => void;
};

export type ListProps = ListStateProps &
  ListDispatchProps & {
    user: string;
    repository: string;
    page?: number;
    limit?: number;
    onChange?: (page: number, limit: number) => void;
  };

const ListComponent: React.FunctionComponent<ListProps> = (props) => {
  const { user, repository, page, limit, getIssues, onChange, issues } = props;

  let containerRef: HTMLElement | null = null;

  const handleGetIssues = (page: number, limit: number) => {
    getIssues(user, repository, page, limit);
    if (onChange) onChange(page, limit);

    if (containerRef) containerRef.scrollTo(0, 0);
  };

  const { items, status } = issues;

  return (
    <>
      <Container>
        {items.length === 0 && status !== 'LOADING' ? (
          <Empty>Nothing not found</Empty>
        ) : (
          <Items ref={(ref) => (containerRef = ref)}>
            {items.map((issue, index) => (
              <Item
                key={index}
                issue={issue}
                link={`/${user}/${repository}/issues/${issue.number}`}
              />
            ))}
          </Items>
        )}
        <Pagination
          limit
          changeOnMount
          initialPage={page}
          initialLimit={limit}
          onChange={handleGetIssues}
          lastPage={issues.last_page}
          limitVariations={[10, 20, 30, 50, 100]}
        />
        {status === 'LOADING' && <Loader>Loading</Loader>}
      </Container>
    </>
  );
};

export const List = hot(module)(
  connect<ListStateProps, ListDispatchProps, {}, RootReducerType>(
    (state) => ({
      issues: state.issues.list,
    }),
    (dispatch) => ({
      getIssues: (user: string, repository: string, page?: number, limit?: number) =>
        dispatch(getIssues(user, repository, page, limit)),
    }),
  )(ListComponent),
);

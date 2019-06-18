import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { IssueModel } from '^/issues/models';
import { Container } from './Item.styled';

export type ItemProps = {
  issue: IssueModel;
  link: string;
};

export const Item: React.FunctionComponent<ItemProps> = (props) => {
  const { issue, link } = props;
  return (
    <Container className="issue">
      <div className="issue__number">#{issue.number}</div>
      <Link to={link} className="issue__title">
        {issue.title}
      </Link>
      <time className="issue__date" dateTime={issue.created_at}>
        {moment(issue.created_at).format('DD MMM YYYY в HH:mm')}
      </time>
    </Container>
  );
};

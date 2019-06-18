import * as React from 'react';
import { Page } from '~/hoc';

const RootPageComponent: React.FunctionComponent = (props) => {
  const { children } = props;

  return <>{children}</>;
};

export const RootPage = Page(RootPageComponent);

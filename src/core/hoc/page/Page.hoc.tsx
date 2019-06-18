import * as React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

export const Page = <T extends any>(Component: React.ComponentType<T>) =>
  class PageHOC extends React.Component<RouteConfigComponentProps & T, {}> {
    public render(): React.ReactNode {
      const { route } = this.props;

      return <Component {...this.props}>{route ? renderRoutes(route.routes) : null}</Component>;
    }
  };

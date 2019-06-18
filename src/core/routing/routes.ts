import { RouteConfig } from 'react-router-config';
import { RootPage } from '@/root';
import { IndexPage } from '@/index';
import { IssuesListPage } from '@/issues/list';
import { IssuePage } from '@/issue';

const routes: RouteConfig[] = [
  {
    component: RootPage,
    routes: [
      {
        path: '/',
        exact: true,
        component: IndexPage,
      },
      {
        exact: true,
        path: '/:user/:repository/issues',
        component: IssuesListPage,
      },
      {
        exact: true,
        path: '/:user/:repository/issues/:issue',
        component: IssuePage,
      },
    ],
  },
];

export default routes;

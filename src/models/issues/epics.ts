import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import parseLinkHeader from 'parse-link-header';

import { http$ } from '~/services/http';

import * as actions from './actions';
import { GET_ISSUE, GET_ISSUES } from './constants';
import { IssueModel } from './models';
import { alerts, alerts$ } from '~/components';
import { AxiosError } from 'axios';

const getLastPage = (linkHeader: string) => {
  const parsedLinkHeader = parseLinkHeader(linkHeader);
  if (!parsedLinkHeader) return;
  return parsedLinkHeader.last
    ? parseInt(parsedLinkHeader.last.page, 10)
    : parseInt(parsedLinkHeader.prev.page, 10) + 1;
};

export const getIssuesEpic: Epic<actions.GetIssuesType, any> = (action$) =>
  action$.ofType(GET_ISSUES).pipe(
    switchMap((params) =>
      http$<IssueModel[]>({
        method: 'GET',
        url: `/repos/${params.user}/${params.repository}/issues`,
        params: {
          page: params.page,
          per_page: params.limit,
        },
      }),
    ),
    map((response) => actions.getIssuesFinish(response.data, getLastPage(response.headers.link))),
    catchError((error: AxiosError) =>
      of(actions.getIssuesFail(error)).pipe(
        tap((action) => alerts.danger(action.error.message, 5000)),
      ),
    ),
  );

export const getIssueEpic: Epic<actions.GetIssueType, any> = (action$) =>
  action$.ofType(GET_ISSUE).pipe(
    switchMap((params) =>
      http$<IssueModel>({
        method: 'GET',
        url: `/repos/${params.user}/${params.repository}/issues/${params.issue}`,
      }),
    ),
    map((response) => actions.getIssueFinish(response.data)),
    catchError((error: AxiosError) =>
      of(actions.getIssueFail(error)).pipe(
        tap((action) => alerts.danger(action.error.message, 5000)),
      ),
    ),
  );

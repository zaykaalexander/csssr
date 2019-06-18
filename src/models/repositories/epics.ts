import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import * as R from 'ramda';

import { http$ } from '~/services/http';

import * as actions from './actions';
import { GET_REPOSITORIES } from './constants';
import { RepositoryModel } from './models';
import { AxiosError } from 'axios';
import { alerts } from '~/components';

export const getRepositoriesEpic: Epic<actions.GetRepositoriesType, any> = (action$) =>
  action$.ofType(GET_REPOSITORIES).pipe(
    map((action) => action.user),
    filter(
      R.compose(
        R.not,
        R.isEmpty,
      ),
    ),
    switchMap((user) =>
      http$<RepositoryModel[]>({
        method: 'GET',
        url: `/users/${user}/repos`,
      }),
    ),
    map((response) => actions.getRepositoriesFinish(response.data)),
    catchError((error: AxiosError) =>
      of(actions.getRepositoriesFail(error)).pipe(
        tap((action) => alerts.danger(action.error.message, 5000)),
      ),
    ),
  );

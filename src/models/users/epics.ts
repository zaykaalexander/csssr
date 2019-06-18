import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import * as R from 'ramda';

import { http$ } from '~/services/http';

import * as actions from './actions';
import { GET_USERS } from './constants';
import { UserModel } from '^/users/models';
import { alerts } from '~/components';
import { AxiosError } from 'axios';

export const getUsersEpic: Epic<actions.GetUsersType, any> = (action$) =>
  action$.ofType(GET_USERS).pipe(
    debounceTime(100),
    map((action) => action.query),
    filter(
      R.compose(
        R.not,
        R.isEmpty,
      ),
    ),
    switchMap((q) =>
      http$<{ items: UserModel[] }>({
        method: 'GET',
        url: '/search/users',
        params: {
          q,
        },
      }),
    ),
    map((response) => actions.getUsersFinish(response.data)),

    catchError((error: AxiosError) =>
      of(actions.getUsersFail(error)).pipe(
        tap((action) => alerts.danger(action.error.message, 5000)),
      ),
    ),
  );

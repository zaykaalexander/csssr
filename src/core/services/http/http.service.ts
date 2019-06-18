import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

import instance from './instance';

export const http$ = <T extends any>(config: AxiosRequestConfig) =>
  new Observable<AxiosResponse<T>>((observer) => {
    const source = Axios.CancelToken.source();

    instance({
      ...config,
      cancelToken: source.token,
    })
      .then((response) => observer.next(response))
      .catch((error) => observer.error(error))
      .finally(() => observer.complete());

    return () => source.cancel('Cancelled by user');
  });

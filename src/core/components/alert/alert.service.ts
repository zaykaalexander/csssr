import { Subject } from 'rxjs';

type AlertTypes = 'success' | 'warning' | 'danger';

export type AlertType = {
  type: AlertTypes;
  message: string;
  timeout?: number;
};

export const alerts$ = new Subject<AlertType>();

export const alerts = {
  success: (message: string, timeout?: number) =>
    alerts$.next({ type: 'success', message, timeout }),
  warning: (message: string, timeout?: number) =>
    alerts$.next({ type: 'warning', message, timeout }),
  danger: (message: string, timeout?: number) => alerts$.next({ type: 'danger', message, timeout }),
};

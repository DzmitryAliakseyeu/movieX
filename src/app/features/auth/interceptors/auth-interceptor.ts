import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const apiKey = environment.apiKey;
  const toManyRequestsStatusCode = 429;
  let authRequest = request;

  if (apiKey) {
    authRequest = request.clone({ params: request.params.set('api_key', apiKey) });
  }

  return next(authRequest).pipe(
    retry({
      count: 2,
      delay: (error) => {
        if (error instanceof HttpErrorResponse && error.status === toManyRequestsStatusCode) {
          return timer(1500);
        }

        return throwError(() => error);
      },
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === toManyRequestsStatusCode) {
        console.warn('Your request count is over the allowed limit (40)');
      }
      return throwError(() => error);
    }),
  );
};

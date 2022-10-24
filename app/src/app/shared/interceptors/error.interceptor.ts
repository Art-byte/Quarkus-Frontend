import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  ErrorAlert, ErrorServerAlert, InformationAlert,
} from '../utils/alerts';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

 
  constructor(private authService: AuthService, private router: Router) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err?.status === 500 || err?.status === 0) {
          ErrorServerAlert();
        } else if (err?.status === 406) {
          err?.error ? InformationAlert('', err?.error) : ErrorAlert('Error al realizar la operación');
        } else {
          ErrorAlert('Error al realizar la operación');
        }
        return throwError(err);
      })
    );
  }

}

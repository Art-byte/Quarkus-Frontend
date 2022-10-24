import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { catchError, finalize, map } from 'rxjs/operators';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ExpiredSession } from '../utils/alerts';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private panddingRequest = 0;
  private filteredUrlPatterns: RegExp[] = [];
  private pendingRequestStatus: ReplaySubject<boolean> =
    new ReplaySubject<boolean>(1);


  constructor(private authService: AuthService, private router: Router) {
    // debugger;
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pendingRequestStatus.next(true);
      }
      if (
        event instanceof NavigationError ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.pendingRequestStatus.next(false);
      }
    });
  }

  private shouldByPass(url: string): boolean {
    return this.filteredUrlPatterns.some((e) => {
      return e.test(url);
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //debugger;
    const shouldByPass = this.shouldByPass(request.url);
    const token: string = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    let contentType = 'application/json';
    if (request.body instanceof FormData) {
      // we are sending a file here
      contentType = 'multipart/form-data';
  }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', ['application/json', 'multipart/form-data', 'image/*']),
    });

    if (!shouldByPass) {
      this.panddingRequest++;

      if (1 === this.panddingRequest) {
        this.pendingRequestStatus.next(true);
      }
    }

    return next.handle(request).pipe(
      map((event) => {
        return event;
      }),
      catchError((error) => {
        //debugger;

        if (error.status === 401) {
          this.handler401Error();
          ExpiredSession();
          this.authService.logout();
          this.router.navigate(['login']);
        }


        return throwError(error);
      }),
      finalize(() => {
        //debugger;
        if (!shouldByPass) {
          this.panddingRequest--;
          if (0 === this.panddingRequest) {
            this.pendingRequestStatus.next(false);
          }
        }
      })
    );
  }

  private handler401Error(): Observable<any> {
    this.authService.logout();
    return throwError('error 401');
  }
}

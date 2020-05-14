import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService, ErrorService } from '@gamecamper/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    protected readonly authenticationService: AuthenticationService,
    protected readonly errorService: ErrorService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.errorService.clear();

    return next.handle(request).pipe(
      catchError(err => {
        const errorText = err.error.message || err.statusText;
        if (err.status === 401) {
          if (request.url.indexOf('/login') !== -1) {
            this.errorService.add('Incorrect username or password');
            return next.handle(request);
          } else {
            this.authenticationService.logout();
            location.reload();
          }
        } else if (err.status === 0) {
          this.errorService.add('Unable to connect to server');
        } else if (err.status === 500) {
          this.errorService.add('Server error encountered');
        } else if (err.status === 404) {
          this.errorService.add('Error: Resource not found');
        } else {
          this.errorService.add(errorText);
        }
        return throwError(errorText);
      })
    );
  }
}

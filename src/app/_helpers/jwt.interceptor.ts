import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@gamecamper/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const theUser = this.authenticationService.theUserValue;
    if (theUser && theUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${theUser.token}`,
        },
        // withCredentials: true,
      });
    }

    return next.handle(request);
  }
}

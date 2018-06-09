import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap , take} from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
     return this.auth.getIdToken()
     .pipe(take(1),
      switchMap(token => {
        if (token) {
          headersConfig['Authorization'] = `bearer ${token}`;
        }
        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
      })
    );
  }
}

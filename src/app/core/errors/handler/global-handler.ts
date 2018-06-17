import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { FirebaseResponseError } from '../common';
import { Router} from '@angular/router';
import * as httpStatusCode from 'http-status-codes';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse | FirebaseResponseError) {
    const router = this.injector.get(Router);
    console.log('richiama error handler');
    if (error instanceof HttpErrorResponse) {
      console.log('errore http response');
      let queryParams = {};
      switch (error.status) {
        case 0:
          queryParams = {
            code: httpStatusCode.SERVICE_UNAVAILABLE,
            message: httpStatusCode.getStatusText(
              httpStatusCode.SERVICE_UNAVAILABLE
            )
          };
          break;
        default:
          queryParams = {code: error.status, message: error.message};
          break;
      }

      router.navigate(['/error'], {queryParams: queryParams});

    } else if (error instanceof FirebaseResponseError) {
      console.log('errore firebase');
      router.navigate(['/error'], {
        queryParams: { code: error.code, message: error.message }
      });
    } else {
      console.log('errore client:', error);
    }
  }
}

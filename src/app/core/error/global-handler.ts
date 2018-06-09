import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Error } from '../actions/error.actions';
import { FirebaseHandlerError } from './firebase-error';
import { HttpErrorResponse } from '@angular/common/http';
import {NotificationService} from '../services';
import {ServerErrorHandler} from './server-handler';


@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private inject: Injector) {



  }

  handleError(error: Error | HttpErrorResponse | ServerErrorHandler<any>) {
    const notificationService = <NotificationService>this.inject.get(NotificationService);
    if (error instanceof HttpErrorResponse) {
      notificationService.message(`${error.status} - ${error.message}`);
    } else if (error instanceof ServerErrorHandler) {
      notificationService.message(error.decodeMessage);
    } else {
      console.log('errore client');
    }
  }
}

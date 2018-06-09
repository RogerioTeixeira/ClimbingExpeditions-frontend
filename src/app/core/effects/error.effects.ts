import { Injectable , ErrorHandler } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';


import { ErrorActionTypes, Error } from '../actions/error.actions';

@Injectable()
export class ErrorEffects {
  @Effect({ dispatch: false })
  error$ = this.actions$.pipe(
    ofType<Error>(ErrorActionTypes.error),
    map(action => action.payload),
    tap(payload => {
      this.errorsHandler.handleError(payload);
    })
  );

  constructor(private actions$: Actions, private errorsHandler: ErrorHandler) {
  }
}

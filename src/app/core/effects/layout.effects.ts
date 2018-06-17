import { Injectable , ErrorHandler } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { NotificationService } from '../services';


import { Notify , LayoutActionTypes } from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {
  @Effect({ dispatch: false })
  error$ = this.actions$.pipe(
    ofType<Notify>(LayoutActionTypes.notify),
    map(action => action.payload),
    tap(payload => {
      this.notificationService.message(payload);
    })
  );

  constructor(private actions$: Actions, private notificationService: NotificationService) {
  }
}

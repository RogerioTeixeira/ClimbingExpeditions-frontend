import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  AuthSignin,
  AuthActionTypes,
  AuthSigninSuccess
} from '../action/auth.actions';
import { FormAuth } from '../models';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Signin),
    map(action => action.payload),
    exhaustMap((auth: FormAuth) => {
      console.log('effect');
      return of(new AuthSigninSuccess({
        uid: 'ddddd',
        name: 'rogerio',
        email: 'dddddd',
        role: 'admin'
      }));
    })
  );

  constructor(private actions$: Actions) {}
}

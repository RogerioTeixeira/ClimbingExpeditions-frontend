import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as errorActions from '../../core/actions';
import * as firebase from 'firebase/app';
import { User } from '../../model';
import {
  AuthSignin,
  AuthActionTypes,
  AuthSigninSuccess,
  AuthSigninFailure,
  UserLoad,
  UserReset
} from '../action';
import { FormAuth } from '../models';
import { AuthService } from '../../core/services';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Signin),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth
        .signInWithEmail(payload.authInfo.email, payload.authInfo.password)
        .pipe(
          switchMap(auth =>
            from([new AuthSigninSuccess(auth.user.email), new UserLoad()])
          ),
          catchError(this.handlerError(new AuthSigninFailure()))
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.SigninSuccess),
    tap(() => this.router.navigate(['/']))
  );

  signup$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Signup),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth
        .signUpWithEmail(payload.authInfo.email, payload.authInfo.password)
        .pipe(
          switchMap(() => from([new AuthSigninSuccess(), new UserLoad()])),
          catchError(this.handlerError(new AuthSigninFailure()))
        )
    )
  );

  logout$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Logout),
    map(action => new UserReset())
  );

  private handlerError(action?: any): any {
    return err => {
      return from([action, new errorActions.Error(err)]);
    };
  }
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router
  ) {}
}

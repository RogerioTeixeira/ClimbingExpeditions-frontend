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
  AuthLogoutSuccess,
  UserReset,
  AuthSignupSuccess
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


  
  @Effect()
  signup$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Signup),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth
        .signUpWithEmail(payload.authInfo.email, payload.authInfo.password, payload.authInfo.name)
        .pipe(
          switchMap((auth) => from([new AuthSignupSuccess(auth.user.email)])),
          catchError(this.handlerError(new AuthSigninFailure()))
        )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Logout),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth
        .logout()
        .pipe(
          switchMap(() => from([new AuthLogoutSuccess(), new UserReset()])),
          catchError(this.handlerError())
        )
    )
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

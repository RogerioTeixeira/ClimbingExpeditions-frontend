import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, defer, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  tap,
  take
} from 'rxjs/operators';
import * as errorActions from '../../core/actions/error.actions';
import * as layoutActions from '../../core/actions/layout.actions';
import {
  AuthActions,
  AuthSignin,
  AuthActionTypes,
  AuthSigninSuccess,
  AuthSigninFailure,
  UserLoad,
  UserLoadSuccess,
  AuthLogout,
  AuthLogoutSuccess,
  UserReset,
  AuthSignupSuccess,
  AuthSignupFailure,
  UserCreate,
  AuthAuthenticaded,
  AuthAuthenticadedSuccess,
  AuthAuthenticadedFailure
} from '../action';
import { FormAuth } from '../models';
import { AuthService, UserService } from '../../core/services';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<AuthActions>(AuthActionTypes.Signin),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth
        .signInWithEmail(payload.authInfo.email, payload.authInfo.password)
        .pipe(
          switchMap(auth =>
            this.userService.getUserInfo().pipe(
              map(user => new AuthSigninSuccess(user.data)),
              catchError(err => {
                if (err.status === 404) {
                  return this.userService
                    .createUser()
                    .pipe(map(user => new AuthSigninSuccess(user.data)));
                } else {
                  throw err;
                }
              })
            )
          ),
          catchError(
            this.handlerError([new AuthSigninFailure(), new AuthLogout()])
          )
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<AuthActions>(AuthActionTypes.SigninSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  signupSuccess$ = this.actions$.pipe(
    ofType<AuthActions>(AuthActionTypes.SignupSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<AuthActions>(AuthActionTypes.Signup),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth
        .signUpWithEmail(
          payload.authInfo.email,
          payload.authInfo.password,
          payload.authInfo.name
        )
        .pipe(
          switchMap(auth =>
            from([new AuthSignupSuccess(), new AuthSignin(payload)])
          ),
          catchError(this.handlerError([new AuthSignupFailure()]))
        )
    )
  );

  @Effect()
  autheticated$ = this.actions$.pipe(
    ofType<AuthActions>(AuthActionTypes.Authenticaded),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth.getCurrentUser().pipe(
        take(1),
        switchMap(
          user =>
            user
              ? from([new AuthAuthenticadedSuccess(user.email), new UserLoad()])
              : of(new AuthAuthenticadedFailure())
        ),
        catchError(
          this.handlerError([new AuthSigninFailure(), new AuthLogout()])
        )
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<AuthActions>(AuthActionTypes.Logout),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth.logout().pipe(
        switchMap(() => from([new AuthLogoutSuccess(), new UserReset()])),
        catchError(this.handlerError())
      )
    )
  );

  @Effect()
  init$: Observable<AuthActions> = defer(() => {
    return of(new AuthAuthenticaded());
  });

  private handlerError(action?: any[]): any {
    return err => {
      const actions = action;
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 0:
            actions.push(new layoutActions.Notify('Servizio momentaneamente non disponibile'));
            break;
        }
      } else {
        switch (err.code) {
          case 'auth/wrong-password':
            actions.push(new layoutActions.Notify('Password non valida'));
            break;
          case 'auth/user-not-found':
            actions.push(new layoutActions.Notify('Utente non trovato'));
            break;
          case 'auth/user-disabled':
            actions.push(new layoutActions.Notify('Utente disabilitato'));
            break;
          case 'auth/email-already-in-use':
            actions.push(
              new layoutActions.Notify('Utente risulta già registrato')
            );
            break;
          default:
            actions.push(new errorActions.Error(err));
            break;
        }
      }
      return from(actions);
    };
  }
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}
}

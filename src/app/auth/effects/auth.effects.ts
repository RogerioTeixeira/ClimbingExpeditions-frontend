import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as errorActions from '../../core/actions';
import * as firebase from 'firebase/app';
import { User } from '../../model';
import {
  AuthSignin,
  AuthActionTypes,
  AuthSigninSuccess,
  AuthSigninFailure
} from '../action/auth.actions';
import { FormAuth } from '../models';
import { AuthService, UserService } from '../../core/services';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<AuthSignin>(AuthActionTypes.Signin),
    map(action => action.payload),
    exhaustMap((payload: FormAuth) =>
      this.auth.signInWithEmail(payload.authInfo.email, payload.authInfo.password)
        .pipe(exhaustMap(() =>
          this.userService.getUserInfo()
          .pipe(map(res => new AuthSigninSuccess(res.data)))
        ), catchError(this.handlerError))
    )
  );
  private handlerError(err): Observable<any> {
    return of(new errorActions.Error(err));
  }
  constructor(private actions$: Actions, private auth: AuthService, private userService: UserService) { }

}

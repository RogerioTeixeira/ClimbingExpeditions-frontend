import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable, from } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as errorActions from '../../core/actions';
import * as firebase from 'firebase/app';
import { User } from '../../model';
import {
  UserActionTypes,
  UserLoad,
  UserLoadFailure,
  UserLoadSuccess,
  UserCreate,
  UserCreateSuccess,
  UserCreateFailure
} from '../action';
import { FormAuth } from '../models';
import { AuthService, UserService } from '../../core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType<UserLoad>(UserActionTypes.Load),
    exhaustMap(() =>
      this.userService.getUserInfo().pipe(
        map(res => new UserLoadSuccess(res.data)),
        catchError((err) => {
          
         return err.error.status === 404 ? 
         from([new UserLoadFailure() , new UserCreate()]) :
         from([new UserLoadFailure() , new errorActions.Error(err)]);
        })
      )
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType<UserLoad>(UserActionTypes.Create),
    exhaustMap(() =>
      this.userService.createUser().pipe(
        map(res => new UserCreateSuccess(res.data)),
        catchError((err:HttpErrorResponse) => {
          return from([new UserCreateFailure() , new errorActions.Error(err)]);
        })
      )
    )
  );

  /*private handlerError(action?: any): any {
    return (err: HttpErrorResponse) => {
      console.log(err);
      const actions: any[] = [action];
      if (err.status !== 404) {
        actions.push(new errorActions.Error(err));
      }
      return from(actions);
    };
  }*/

  constructor(private actions$: Actions, private userService: UserService) {}
}

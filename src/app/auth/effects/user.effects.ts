import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable , from } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as errorActions from '../../core/actions';
import * as firebase from 'firebase/app';
import { User } from '../../model';
import {
  UserActionTypes,
  UserLoad,
  UserLoadFailure,
  UserLoadSuccess,
  AuthLogout
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
      this.userService.getUserInfo()
        .pipe(
          map(res => new UserLoadSuccess(res.data)), 
          catchError(this.handlerError(new UserLoadFailure()))
        )
    )
  );

  private handlerError(action?:any): any {
      return (err:HttpErrorResponse) =>{
        console.log(err);
        const actions: any[] = [action];
        if (err.status != 404){
          actions.push(new errorActions.Error(err))
        }
        return from(actions);    
      }
  }


  constructor(private actions$: Actions, private userService: UserService) { }

}

import { Action } from '@ngrx/store';
import {User} from '../../model'

export enum UserActionTypes {
  Load = '[User] load',
  LoadSuccess = '[User] Load success',
  LoadFailure = '[User] Load failure',
  Reset = '[User] reset',
}

export class UserLoad implements Action {
  readonly type = UserActionTypes.Load;
  constructor(public payload?: any) {}
}

export class UserLoadSuccess implements Action {
  readonly type = UserActionTypes.LoadSuccess;
  constructor(public payload?: User) {}
}

export class UserLoadFailure implements Action {
  readonly type = UserActionTypes.LoadFailure;
  constructor(public payload?: Error) {}
}

export class UserReset implements Action {
  readonly type = UserActionTypes.Reset;
  constructor(public payload?: Error) {}
}


export type UserActions =
  | UserLoad
  | UserLoadSuccess
  | UserLoadFailure
  | UserReset;
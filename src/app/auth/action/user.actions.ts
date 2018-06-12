import { Action } from '@ngrx/store';
import {User} from '../../model';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadSuccess = '[User] Load success',
  LoadFailure = '[User] Load failure',
  Create = '[User] Create',
  CreateSuccess = '[User] Create success',
  CreateFailure = '[User] Create failure',

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

export class UserCreate implements Action {
  readonly type = UserActionTypes.Create;
  constructor(public payload?: any) {}
}

export class UserCreateSuccess implements Action {
  readonly type = UserActionTypes.CreateSuccess;
  constructor(public payload?: User) {}
}

export class UserCreateFailure implements Action {
  readonly type = UserActionTypes.CreateFailure;
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
  | UserCreate
  | UserCreateSuccess
  | UserCreateFailure
  | UserReset;

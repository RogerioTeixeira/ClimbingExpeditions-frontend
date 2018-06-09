import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  error = '[Error] error'
}

export class Error implements Action {
  readonly type = ErrorActionTypes.error;
  constructor(public payload: any) {}
}

export type ErrorActions = Error;

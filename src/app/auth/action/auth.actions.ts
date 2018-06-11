import { Action } from '@ngrx/store';
import { FormAuth} from '../models';
//import {User} from '../../model'

export enum AuthActionTypes {
  Signin = '[Auth] Signin',
  SigninSuccess = '[Auth] Signin success',
  SigninFailure = '[Auth] Signin failure',
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup success',
  SignupFailure = '[Auth] Signup failure',
  Logout = '[Auth] logout'
}

export class AuthSignin implements Action {
  readonly type = AuthActionTypes.Signin;
  constructor(public payload?: FormAuth) {}
}

export class AuthSigninSuccess implements Action {
  readonly type = AuthActionTypes.SigninSuccess;
  constructor(public payload?: any) {}
}

export class AuthSigninFailure implements Action {
  readonly type = AuthActionTypes.SigninFailure;
  constructor(public payload?: any) {}
}

export class AuthSignup implements Action {
  readonly type = AuthActionTypes.Signup;
  constructor(public payload?: FormAuth) {}
}

export class AuthSignupSuccess implements Action {
  readonly type = AuthActionTypes.SignupSuccess;
  constructor(public payload?: any) {}
}

export class AuthSignupFailure implements Action {
  readonly type = AuthActionTypes.SignupFailure;
  constructor(public payload?: any) {}
}

export class AuthLogout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | AuthSignin
  | AuthSignup
  | AuthSigninSuccess
  | AuthSignupSuccess
  | AuthSigninFailure
  | AuthSignupFailure
  | AuthLogout;

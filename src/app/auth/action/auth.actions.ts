import { Action } from '@ngrx/store';
import { FormAuth} from '../models';

export enum AuthActionTypes {
  Signin = '[Auth] Signin',
  SigninSuccess = '[Auth] Signin success',
  SigninFailure = '[Auth] Signin failure',
  Authenticaded = '[Auth] Authenticaded',
  AuthenticadedSuccess = '[Auth] Authenticaded success',
  AuthenticadedFailure = '[Auth] Authenticaded failure',
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup success',
  SignupFailure = '[Auth] Signup failure',
  Logout = '[Auth] logout',
  LogoutSuccess = '[Auth] logout success'
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

export class AuthAuthenticaded implements Action {
  readonly type = AuthActionTypes.Authenticaded;
  constructor(public payload?: FormAuth) {}
}

export class AuthAuthenticadedSuccess implements Action {
  readonly type = AuthActionTypes.AuthenticadedSuccess;
  constructor(public payload?: any) {}
}

export class AuthAuthenticadedFailure implements Action {
  readonly type = AuthActionTypes.AuthenticadedFailure;
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
  constructor(public payload?: any) {}
}

export class AuthLogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
  constructor(public payload?: any) {}
}

export type AuthActions =
  | AuthSignin
  | AuthSigninSuccess
  | AuthSigninFailure
  | AuthSignup
  | AuthSignupSuccess
  | AuthSignupFailure
  | AuthLogout
  | AuthLogoutSuccess
  | AuthAuthenticaded
  | AuthAuthenticadedSuccess
  | AuthAuthenticadedFailure;
  

import { User } from '../../model';
import { AuthActions, AuthActionTypes } from '../action/auth.actions';

export interface State {
  loggedIn: boolean;
  pending: boolean;
  email?:string;
  photo?:string;
}

export const initialState: State = {
  loggedIn: false,
  pending: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Signin:
    case AuthActionTypes.Signup:
      return { ...state, pending:true , loggedIn :false };

    case AuthActionTypes.SigninSuccess:
    case AuthActionTypes.SignupSuccess:
      return { ...state, pending:false , loggedIn:true , email:action.payload };

    case AuthActionTypes.SigninFailure:
    case AuthActionTypes.SignupFailure:
    case AuthActionTypes.Logout:
      return initialState;

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUserid = (state: State) => state.email;
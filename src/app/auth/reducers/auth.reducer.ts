import { User } from '../../model';
import { AuthActions, AuthActionTypes } from '../action/auth.actions';

export interface State {
  loggedIn: boolean;
  pending: boolean;
  user?: User;
}

export const initialState: State = {
  loggedIn: false,
  pending: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Signin:
    case AuthActionTypes.Signup:
    case AuthActionTypes.Authenticaded:
      return { ...state, pending: true, loggedIn: false };
    case AuthActionTypes.SignupSuccess:
    return {
      ...state,
      pending: false,
    };
    case AuthActionTypes.SigninSuccess:
    case AuthActionTypes.AuthenticadedSuccess:
      return {
        ...state,
        pending: false,
        loggedIn: true,
        user: action.payload
      };

    case AuthActionTypes.SigninFailure:
    case AuthActionTypes.SignupFailure:
    case AuthActionTypes.LogoutSuccess:
    case AuthActionTypes.AuthenticadedFailure:
      return initialState;

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getLoggedPending = (state: State) => state.pending;
export const getUserid = (state: State) => state.user ? state.user.email : null;

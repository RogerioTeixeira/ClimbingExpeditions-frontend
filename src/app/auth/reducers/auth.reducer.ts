import { Action } from '@ngrx/store';
import { User } from '../models';
import { AuthActions, AuthActionTypes } from '../action/auth.actions';

export interface State {
  loggedIn: boolean;
  user?: User;
}

export const initialState: State = {
  loggedIn: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.SigninSuccess:
    case AuthActionTypes.SignupSuccess:
      return { ...state, loggedIn: true, user: action.payload };

    case AuthActionTypes.Logout:
      return initialState;

    default:
      return state;
  }
}

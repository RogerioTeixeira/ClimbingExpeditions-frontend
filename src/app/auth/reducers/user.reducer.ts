import { User } from '../../model';
import { UserActions, UserActionTypes } from '../action';

export interface State {
  pending: boolean;
  user?: User;
}

export const initialState: State = {
  pending: false
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.Load:
      return { ...state, pending: true };
    case UserActionTypes.LoadSuccess:
    case UserActionTypes.CreateSuccess:
    console.log('action.payload user create:', action.payload )
      return { ...state, pending: false, user: action.payload };

    case UserActionTypes.LoadFailure:
    case UserActionTypes.Reset:
      return initialState;
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;

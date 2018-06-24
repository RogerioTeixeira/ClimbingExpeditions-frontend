import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers/index';
import * as fromAuth from './auth.reducer';
import * as fromUser from './user.reducer';

export interface AuthState {
  status: fromAuth.State;
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  user: fromUser.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const getLoggedPending = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedPending
);


export const selectAuthUserState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);


export const getuser = createSelector(
  selectAuthUserState,
  fromUser.getUser
);



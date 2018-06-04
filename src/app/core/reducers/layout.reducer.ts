import { Action } from '@ngrx/store';
import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';

export interface State {
  showNavBar: boolean;
  showFooter: boolean;
}

export const initialState: State = {
  showNavBar: true,
  showFooter: true
};

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {
    case LayoutActionTypes.showNavBar:
      return { ...state, showNavBar: true };
    case LayoutActionTypes.hideNavBar:
      return { ...state, showNavBar: false };
    case LayoutActionTypes.showFooter:
      return { ...state, showFooter: true };
    case LayoutActionTypes.hideFooter:
      return { ...state, showFooter: false };
    default:
      return state;
  }
}

export const isShowNavBar = (state: State) => state.showNavBar;
export const isShowFooter = (state: State) => state.showFooter;

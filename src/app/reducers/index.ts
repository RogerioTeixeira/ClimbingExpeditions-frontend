import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLayout from '../core/reducers/layout.reducer';
import { storeFreeze } from 'ngrx-store-freeze';


export interface State {
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];


  export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

  export const isShowNabar = createSelector(
    getLayoutState,
    fromLayout.isShowNavBar
  );

  export const isShowFooter = createSelector(
    getLayoutState,
    fromLayout.isShowFooter
  );

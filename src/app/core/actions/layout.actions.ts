import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  showNavBar = '[Layout] Show Navbar',
  hideNavBar = '[Layout] Hide Navbar',
  showFooter = '[Layout] Show Footer',
  hideFooter = '[Layout] Hide Footer'
}

export class ShowNavBar implements Action {
  readonly type = LayoutActionTypes.showNavBar;
}

export class HideNavBar implements Action {
  readonly type = LayoutActionTypes.hideNavBar;
}

export class ShowFooter implements Action {
  readonly type = LayoutActionTypes.showFooter;
}

export class HideFooter implements Action {
  readonly type = LayoutActionTypes.hideFooter;
}

export type LayoutActions = ShowNavBar | HideNavBar | ShowFooter | HideFooter;

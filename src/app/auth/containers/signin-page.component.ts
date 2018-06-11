import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormAuth } from '../models';
import { Store } from '@ngrx/store';
import * as LayoutActions from '../../core/actions/layout.actions';
import * as actions from '../../auth/action';

@Component({
  selector: 'clex-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./auth-share.component.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new LayoutActions.HideNavBar());
    this.store.dispatch(new LayoutActions.HideFooter());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutActions.ShowNavBar());
    this.store.dispatch(new LayoutActions.ShowFooter());
  }

  signIn(event: FormAuth) {
    this.store.dispatch(new actions.AuthSignin(event));
  }
}

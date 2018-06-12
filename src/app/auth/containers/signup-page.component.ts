import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormAuth } from '../models';
import * as LayoutActions from '../../core/actions/layout.actions';
import { Store } from '@ngrx/store';
import * as actions from '../../auth/action';

@Component({
  selector: 'clex-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./auth-share.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  constructor(public store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new LayoutActions.HideNavBar());
    this.store.dispatch(new LayoutActions.HideFooter());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutActions.ShowNavBar());
    this.store.dispatch(new LayoutActions.ShowFooter());
  }

  signup(event: FormAuth) {
    this.store.dispatch(new actions.AuthSignup(event));
  }
}

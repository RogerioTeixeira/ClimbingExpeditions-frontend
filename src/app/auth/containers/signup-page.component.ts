import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormAuth } from '../models';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import * as LayoutActions from '../../core/actions/layout.actions';

@Component({
  selector: 'clex-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./auth-share.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  constructor(public store: Store<any>, private auth: AuthService) { }

  ngOnInit() {
    this.store.dispatch(new LayoutActions.HideNavBar());
    this.store.dispatch(new LayoutActions.HideFooter());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutActions.ShowNavBar());
    this.store.dispatch(new LayoutActions.ShowFooter());
  }

  signup(event: FormAuth) {
    this.auth.signUpWithEmail(event.authInfo.email, event.authInfo.password);
  }
}

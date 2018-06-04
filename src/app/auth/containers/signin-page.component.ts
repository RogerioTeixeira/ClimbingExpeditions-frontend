import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormAuth } from '../models';
import { Store } from '@ngrx/store';
import * as LayoutActions from '../../core/actions/layout.actions';
import * as AuthActions from '../../auth/action/auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'clex-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./auth-share.component.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  constructor(public store: Store<any>, private auth: AuthService) {}

  ngOnInit() {
    this.store.dispatch(new LayoutActions.HideNavBar());
    this.store.dispatch(new LayoutActions.HideFooter());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new LayoutActions.ShowNavBar());
    this.store.dispatch(new LayoutActions.ShowFooter());
  }

  signIn(event: FormAuth) {
    this.store.dispatch(new AuthActions.AuthSignin(event));
    this.auth
      .signInWithEmail(event.authInfo.email, event.authInfo.password)
      .subscribe((credential) => {
        console.log('user==>', credential.user.email);
      });
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInFormComponent } from './components/signin-form/signin-form.component';
import { ShareModule } from '../share/share.module';
import { SignInPageComponent } from './containers/signin-page.component';
import { SocialAuthComponent } from './components/social-auth/social-auth.component';
import { SignUpFormComponent } from './components/signup-form/signup-form.component';
import { SignUpPageComponent } from './containers/signup-page.component';
import { CardAuthComponent } from './components/card-auth/card-auth.component';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, ShareModule],
  declarations: [
    SignInFormComponent,
    SignInPageComponent,
    SocialAuthComponent,
    SignUpFormComponent,
    SignUpPageComponent,
    CardAuthComponent
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),

  ]
})
export class RootAuthModule {}

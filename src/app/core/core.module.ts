import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers/app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {ShareModule} from '../share/share.module';

import { environment } from '../../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService , UserService , NotificationService } from './services';

import { reducers, metaReducers } from './reducers/index';
import { ErrorEffects , LayoutEffects } from './effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ErrorModule} from './errors/error.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ErrorEffects , LayoutEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ShareModule,
    LayoutModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    MatSnackBarModule
  ],
  declarations: [LayoutComponent, AppComponent, FooterComponent, NavbarComponent, SidenavComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AngularFireAuth ,
    AuthService ,
    UserService ,
    NotificationService
  ],
  exports: [AppComponent]
})
export class CoreModule {
}

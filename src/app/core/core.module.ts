import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers/app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {ShareModule} from '../share/share.module';

import { environment } from '../../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    LayoutModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config)
  ],
  declarations: [LayoutComponent, AppComponent, FooterComponent, NavbarComponent, SidenavComponent],
  exports: [AppComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AngularFireAuth , AuthService , UserService]
    };
  }
}

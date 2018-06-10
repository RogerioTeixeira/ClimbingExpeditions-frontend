import { BrowserModule } from '@angular/platform-browser';
import { NgModule , ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/containers/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'FrontEnd' }),

    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

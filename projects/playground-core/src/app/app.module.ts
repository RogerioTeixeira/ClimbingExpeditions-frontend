import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {ChartsModule , CropperModule} from '@rtn/core/dev';
import {ChartDemoComponent} from './chart-demo/chart-demo.component';
import { DialogCropComponent } from './dialog-crop/dialog-crop.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ChartDemoComponent,
    DialogCropComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    ChartsModule,
    MatDialogModule,
    CropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

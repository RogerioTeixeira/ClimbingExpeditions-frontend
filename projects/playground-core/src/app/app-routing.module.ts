import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ChartDemoComponent} from './chart-demo/chart-demo.component';
import { DialogCropComponent } from './dialog-crop/dialog-crop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chart', component: ChartDemoComponent },
  { path: 'cropper', component: DialogCropComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

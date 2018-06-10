import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import {ShareModule} from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    ShareModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }

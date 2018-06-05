import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from './material.module';

const imports = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

@NgModule({
  imports: imports,
  declarations: [],
  exports: imports
})
export class ShareModule {}

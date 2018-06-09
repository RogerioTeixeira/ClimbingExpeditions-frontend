import { NgModule , ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './global-handler';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  declarations: []
})
export class ErrorModule { }

import { NgModule , ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './handler/global-handler';
import {ShareModule} from '../../share/share.module';
import {ErrorComponent} from './components/error.component';
import { ErrorRoutingModule} from './error-routing.module';
import {ErrorService} from './service/error.service';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    ShareModule
  ],
  providers: [
    ErrorService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }

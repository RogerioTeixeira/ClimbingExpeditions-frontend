import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { ChartFactoryService } from './chart-factory.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ChartsComponent],
  exports: [ChartsComponent],
  providers: [ChartFactoryService]
})
export class ChartsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterFactoryService } from './filter-factory.service';
import { CropperDialogComponent } from './cropper-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ImageFilterDirective } from './image-filter.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';
import { FilterSliderComponent } from './filter-slider/filter-slider.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CropperComponent , CropperDialogComponent , ImageFilterDirective, FilterSliderComponent],
  exports: [CropperDialogComponent],
  entryComponents: [CropperDialogComponent],
  providers: [FilterFactoryService]
})
export class CropperModule {}

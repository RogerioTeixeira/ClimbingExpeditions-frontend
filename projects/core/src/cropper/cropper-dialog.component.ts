import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  ViewChild
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CropperComponent } from './cropper.component';
import { Filter } from './filter-factory.service';
interface FilterConfig {
  min: number;
  max: number;
  value: number;
  step: number;
  filterName: Filter;
  label: string;
}

@Component({
  selector: 'rtn-cropper-dialog',
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CropperDialogComponent implements OnInit {
  filtersConfig: FilterConfig[] = [
    {
      min: -1,
      max: 1,
      step: 0.01,
      value: 0,
      filterName: 'Saturation',
      label: 'Saturazione'
    },
    {
      min: -1,
      max: 1,
      step: 0.01,
      value: 0,
      filterName: 'Contrast',
      label: 'Contrasto'
    },
    {
      min: 0,
      max: 1000,
      step: 1,
      value: 0,
      filterName: 'Noise',
      label: 'Noise'
    },
    {
      min: -1,
      max: 1,
      step: 0.01,
      value: 0,
      filterName: 'Brightness',
      label: 'Luminosità'
    }
  ];
  filtersConfigSelected: FilterConfig;
  filters: Filter[] = [
    'Grayscale',
    'Invert',
    'Sepia',
    'Polaroid',
    'BlackWhite',
    'Brownie',
    'Vintage'
  ];
  imageurl = 'http://res.cloudinary.com/climbingexpeditions/image/upload/v1516820110/images/5a664a98ca5f972350ca8a72/picture.png';
  @ViewChild('cropper') cropper: CropperComponent;
  constructor(
    public dialogRef: MatDialogRef<CropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {

  }
  onLoad(event) {}

  changeFilterValue(filterName, event) {
    this.cropper.addFilter(filterName, event);
    this.filtersConfigSelected.value = event;
  }

  selectFilter(filter: Filter) {
    this.filtersConfigSelected = this.filtersConfig.filter(
      x => x.filterName === filter
    )[0];
  }
  back() {
    const index = this.filtersConfig.findIndex(
      x => x.filterName === this.filtersConfigSelected.filterName
    );
    this.filtersConfig[index] = this.filtersConfigSelected;
    this.filtersConfigSelected = null;
  }
  save() {
    this.cropper.cropImage();
  }

  onCrop(event) {
    this.dialogRef.close(event);
  }
}

import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

const imports = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  imports: imports,
  exports: imports,
  declarations: []
})
export class MaterialModule {}

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
  MatCheckboxModule
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
  MatCheckboxModule
];

@NgModule({
  imports: imports,
  exports: imports,
  declarations: []
})
export class MaterialModule {}

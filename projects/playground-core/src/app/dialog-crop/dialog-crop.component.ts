import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import { Observable } from 'rxjs';
import { CropperDialogComponent } from '@rtn/core/dev';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

@Component({
  selector: 'app-dialog-crop',
  templateUrl: './dialog-crop.component.html',
  styleUrls: ['./dialog-crop.component.scss']
})
export class DialogCropComponent implements OnInit {
  public $afterClosed: Observable<any>;
  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
  }

  open() {
    const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset);
    const dialogRef = this.dialog.open(CropperDialogComponent, {
      maxWidth: isHandset ? '100%' : '600px',
      width: isHandset ? '100%' : '600px',
      height: isHandset ? '100%' : '500px',
      autoFocus: false,
      data: { cropperOptions: { resizeToWidth: 350 } }
    });
    this.$afterClosed = dialogRef.afterClosed();
  }
}

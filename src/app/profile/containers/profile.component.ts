import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserInfoEditComponent } from '../components/user-info-edit/user-info-edit.component';

@Component({
  selector: 'clex-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserInfoEditComponent, {minWidth: 744 , maxWidth: 'calc(100vh - 64px)'});
  }

}

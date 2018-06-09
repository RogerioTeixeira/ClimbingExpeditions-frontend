import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}
  public message(msg: string) {
    this.snackBar.open(msg, 'Chiudi', {
      duration: 0,
      verticalPosition: 'top'
    });
  }
}

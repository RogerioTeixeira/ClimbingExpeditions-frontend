import { Component } from '@angular/core';

@Component({
  selector: 'clex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor() {
    this.title = 'prova';
  }
}

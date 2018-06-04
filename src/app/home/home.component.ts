import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { pipe, of, Observable } from 'rxjs';

@Component({
  selector: 'clex-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {}


  signup() {}
}

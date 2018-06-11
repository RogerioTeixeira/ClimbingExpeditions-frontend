import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getLoggedIn } from '../../../auth/reducers';
import { AuthLogout } from '../../../auth/action';

@Component({
  selector: 'clex-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() drawerToggle: EventEmitter<any> = new EventEmitter<any>();
  @Input() isHandset: boolean;

  $isLoggin: Observable<boolean>;
  constructor(private store: Store<any>) {
    this.$isLoggin = this.store.select(getLoggedIn);
  }

  ngOnInit() {}

  logout() {
    this.store.dispatch(new AuthLogout());
  }
}

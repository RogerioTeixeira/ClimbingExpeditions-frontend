import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { isShowNabar, isShowFooter } from '../../../core/reducers/index';

@Component({
  selector: 'clex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  $navbar: Observable<any>;
  $footer: Observable<any>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public store: Store<any>
  ) {}

  ngOnInit() {
    this.$navbar = this.store.pipe(delay(0), select(isShowNabar));
    this.$footer = this.store.pipe(delay(0), select(isShowFooter));
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'clex-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() drawerToggle: EventEmitter<any> = new EventEmitter<any>();
  @Input() isHandset: boolean;
  constructor() {}

  ngOnInit() {}
}

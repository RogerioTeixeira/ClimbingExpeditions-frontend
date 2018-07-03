import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clex-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() name: string;
  @Input() location: string;

  @Output() clickUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}

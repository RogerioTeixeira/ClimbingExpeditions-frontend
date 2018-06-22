import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'clex-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss']
})
export class CardAuthComponent implements OnInit {
  @Input() title: string;
  @Input() showLoading: boolean;
  constructor() {}

  ngOnInit() {}
}

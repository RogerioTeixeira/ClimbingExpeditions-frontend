import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'rtn-filter-slider',
  templateUrl: './filter-slider.component.html',
  styleUrls: ['./filter-slider.component.css']
})
export class FilterSliderComponent implements OnInit {

  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Input() step = 1;

  @Output()
  change: EventEmitter<MatSliderChange> = new EventEmitter<MatSliderChange>();

  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
}

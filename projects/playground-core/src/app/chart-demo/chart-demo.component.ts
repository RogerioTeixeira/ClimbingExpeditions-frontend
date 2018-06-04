import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.scss']
})
export class ChartDemoComponent implements OnInit {
  public optionsList = new Array();

  constructor() {
    this.optionsList.push({dataset: [{ data: 10, color: '#FF4081' }, { data: 80, color: '#BDBDBD' }]});
    this.optionsList.push({dataset: [{ data: 40, color: '#FF4081' }, { data: 60, color: '#BDBDBD' }]});
    this.optionsList.push({dataset: [{ data: 30, color: '#FF4081' }, { data: 70, color: '#BDBDBD' }]});
    this.optionsList.push({dataset: [{ data: 80, color: '#FF4081' }, { data: 20, color: '#BDBDBD' }]});
    this.optionsList.push({dataset: [{ data: 50, color: '#FF4081' }, { data: 50, color: '#BDBDBD' }]});
  }

  ngOnInit() {}
}

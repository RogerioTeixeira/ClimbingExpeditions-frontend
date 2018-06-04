import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnDestroy
} from '@angular/core';
import { fabric } from 'fabric';
import { ChartOptions } from './chart-options';
import { ChartFactoryService } from './chart-factory.service';
import { Chart } from './chart';

@Component({
  selector: 'rtn-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;
  private canvas: fabric.StaticCanvas;
  private _options: ChartOptions;
  private chartCreator: Chart<any>;

  @Input() type: string;

  @Input()
  set options(value) {
    this._options = value;
  }

  get options(): ChartOptions {
    return this._options;
  }

  constructor(private chartFactory: ChartFactoryService) {}

  ngOnInit() {
    this.chartCreator = this.chartFactory.getChartCreator(this.type);
    if (!this.chartCreator) {
      throw new Error('Chart type not implemented.');
    }
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.createChart();
  }

  initCanvas() {
    const el: HTMLCanvasElement = this.canvasRef.nativeElement;
    const clientWidth = el.parentElement.clientWidth;
    const options: any = { width: clientWidth, height: clientWidth };
    this.canvas = new fabric.StaticCanvas(el, options);
  }

  createChart() {
    const obj = this.chartCreator.createChart(this.canvas, this.options);
    this.canvas.add(obj);
  }
}

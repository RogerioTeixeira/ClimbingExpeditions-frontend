import { fabric } from 'fabric';
export interface Chart<T> {
  createChart(canvas: fabric.Canvas | fabric.StaticCanvas, options: T): fabric.Object;
}

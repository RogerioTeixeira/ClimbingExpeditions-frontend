import { Chart } from './chart';
import { ChartOptions } from './chart-options';
import { fabric } from 'fabric';
export class Doughnut implements Chart<ChartOptions> {
  createChart(
    canvas: fabric.StaticCanvas,
    options: ChartOptions
  ): fabric.Object {
    const group = new fabric.Group();
    const canvasWidth = canvas.getWidth();
    const totale = options.dataset.reduce((val1, val2) => val1 + val2.data, 0);

    options.dataset.reduce((startAngle, el) => {
      const piece =  (Math.PI * 2) * (el.data / totale);
      const endAngle = startAngle + piece;
      const circle = this.createCircle(canvasWidth, el.color, startAngle, endAngle);
      group.addWithUpdate(circle);
      return endAngle;
    }, (Math.PI / 2) * -1 );
    return group;

  }

  createCircle(canvasWidth, color, startAngle, endAngle): fabric.Circle {
    const strokeWidth = canvasWidth / 4;
    const radius = canvasWidth / 2 - strokeWidth / 2;
    return new fabric.Circle({
      radius: radius,
      left: 0,
      top: 0,
      angle: 0,
      startAngle: startAngle,
      endAngle: endAngle,
      stroke: color,
      strokeWidth: strokeWidth,
      fill: ''
    });
  }
}

import { fabric } from 'fabric';

export interface ICropBoxOption extends fabric.IRectOptions {
    aspectRatio?: number;
    scaleCropBox?: number;
}

export interface IDimension {
    width?: number;
    height?: number;
}

export class CropBox extends fabric.Rect {
    public aspectRatio: number;
    public scaleCropBox: number;
    public cropBoxWidth: number;
    public cropBoxHeight: number;
    public cropBoxTop: number;
    public cropBoxLeft: number;

    constructor(options: ICropBoxOption) {
        super(options);
        this.aspectRatio = options.aspectRatio ? options.aspectRatio : 1;
        this.scaleCropBox = options.scaleCropBox ? options.scaleCropBox : 0.9;
        this.type = 'cropbox';
    }

    _render(ctx: CanvasRenderingContext2D) {
        if (!this.visible) {
            return;
        }

        if (this.width > this.height) {
            this.cropBoxWidth = this.height;
            this.cropBoxHeight = this.height * this.aspectRatio;
        } else {
            this.cropBoxWidth = this.width;
            this.cropBoxHeight = this.width / this.aspectRatio;
        }
        this.cropBoxWidth *= this.scaleCropBox;
        this.cropBoxHeight *= this.scaleCropBox;
        this.cropBoxTop = this.top + Math.ceil((this.height / 2) - (this.cropBoxHeight / 2));
        this.cropBoxLeft = this.left + Math.ceil((this.width / 2) - (this.cropBoxWidth / 2));

        const points = this.calcOvarlayPoint();




        this.renderOrverlay(points, ctx);
        this.renderInternalBox(points, ctx);
    }

    renderOrverlay(point: any, ctx: CanvasRenderingContext2D) {
        // Draw overlay and center "hole"
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.moveTo(point.x0 - 1, point.y0 - 2);
        ctx.lineTo(point.x0 - 1, point.y3);
        ctx.lineTo(point.x2, point.y3);
        ctx.lineTo(point.x2, point.y2);
        ctx.lineTo(point.x1, point.y2);
        ctx.lineTo(point.x1, point.y1);
        ctx.lineTo(point.x2, point.y1);
        ctx.lineTo(point.x2, point.y0 - 2);
        ctx.closePath();

        ctx.moveTo(point.x4, point.y0 - 2);
        ctx.lineTo(point.x4, point.y3 + 2);
        ctx.lineTo(point.x2, point.y3 + 2);
        ctx.lineTo(point.x2, point.y2);
        ctx.lineTo(point.x3, point.y2);
        ctx.lineTo(point.x3, point.y1);
        ctx.lineTo(point.x2, point.y1);
        ctx.lineTo(point.x2, point.y0 - 2);
        ctx.closePath();
        ctx.fill();
    }

    renderInternalBox(point: any, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.beginPath();
        ctx.moveTo(point.x1, point.y1);
        ctx.lineTo(point.x3, point.y1);
        ctx.lineTo(point.x3, point.y2);
        ctx.lineTo(point.x1, point.y2);
        ctx.closePath();
        ctx.stroke();

        this.renderInternalBoxGrid(point, ctx);


    }

    renderInternalBoxGrid(point: any, ctx: CanvasRenderingContext2D) {
        const totalCell = 3;
        const distanceX = this.cropBoxWidth / totalCell;
        const distanceY = this.cropBoxHeight / totalCell;

        ctx.setLineDash([7, 7]);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#FFFFFF';
        for (let i = 1; i < totalCell; i++) {
            ctx.beginPath();
            ctx.moveTo(point.x1 + distanceX * i, point.y1 + this.strokeWidth);
            ctx.lineTo(point.x1 + distanceX * i, point.y2 - this.strokeWidth);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(point.x1 + this.strokeWidth , point.y1 + distanceY * i);
            ctx.lineTo(point.x3 - this.strokeWidth, point.y1 + distanceY * i);
            ctx.stroke();



          }
    }

    /*
      x0    x1  x2  x3    x4
   y0 +---------+---------+
      |         |         |
   y1 |     +---+---+     |
      |     |       |     |
      |     |       |     |
   y2 |     +---+---+     |
      |         |         |
   y3 +---------+---------+

    */
    calcOvarlayPoint() {
        const obj: any = {};
        obj.x0 = Math.ceil(-this.width / 2 - this.left);
        obj.x1 = Math.ceil(-this.cropBoxWidth / 2);
        obj.x2 = Math.ceil(obj.x0 + this.width / 2);
        obj.x3 = obj.x1 + this.cropBoxWidth;
        obj.x4 = obj.x0 + this.width;

        obj.y0 = Math.ceil(-this.height / 2 - this.top);
        obj.y1 = Math.ceil(-this.cropBoxHeight / 2);
        obj.y2 = obj.y1 + this.cropBoxHeight;
        obj.y3 = obj.y0 + this.height;

        return obj;
    }
}

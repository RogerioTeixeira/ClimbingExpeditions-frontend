import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { fabric } from 'fabric';
import { FilterFactoryService, Filter } from './filter-factory.service';
import { CropperOptions } from './cropper-options';
import { CropBox } from './crop-box';

const DEFAULT_CROPPER_OPTIONS: CropperOptions = { aspectRatio: 1 };

@Component({
  selector: 'rtn-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit, AfterViewInit {
  private _imageUrl;
  public isLoading = true;
  private _isClickDown = false;
  private _mousePoint: any;
  private _canvas: fabric.Canvas;
  private _cropperOptions: CropperOptions = DEFAULT_CROPPER_OPTIONS;

  @Input()
  set imageUrl(value) {
    this._imageUrl = value;
    if (this._canvas && !this._canvas.isEmpty()) {
      this.reloadImage();
    }
  }
  get imageUrl() {
    return this._imageUrl;
  }

  @Input()
  set cropperOptions(value) {
    this._cropperOptions = { ...DEFAULT_CROPPER_OPTIONS, ...value };
  }

  get cropperOptions() {
    return this._cropperOptions;
  }

  @Output() imageCropped: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageLoaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private el: ElementRef,
    private filterFactory: FilterFactoryService
  ) {}

  ngOnInit() {
    fabric.filterBackend = new fabric.Canvas2dFilterBackend();

    if (!this.imageUrl) {
      this.imageUrl =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII';
    }
  }

  ngAfterViewInit() {
    this.initCanvas();
    this.loadImage();
  }

  initCanvas() {
    const nativeEl: HTMLElement = this.el.nativeElement;
    const options = {
      selection: false,
      width: nativeEl.clientWidth,
      height: nativeEl.clientHeight,
      preserveObjectStacking: true
    };

    const canvasRef = nativeEl.getElementsByTagName('canvas').item(0);
    this._canvas = new fabric.Canvas(canvasRef, options);

    this._canvas.on('mouse:down', event => {
      const img = this.getImage();
      if (this._canvas.containsPoint(event.e, img)) {
        this._isClickDown = true;
        this._mousePoint = this._canvas.getPointer(event.e);
      }
    });

    this._canvas.on('mouse:up', event => {
      this._isClickDown = false;
      this._mousePoint = null;
    });

    this._canvas.on('mouse:move', event => {
      if (this._isClickDown) {
        const img: any = this.getImage();
        const pointer = this._canvas.getPointer(event.e);
        img.set({
          top: img.top + (pointer.y - this._mousePoint.y),
          left: img.left + (pointer.x - this._mousePoint.x)
        });
        this._mousePoint = pointer;
        this._canvas.renderAll();
      }
    });
    /*  this.canvas.on('object:moving', () => {
        const cropBox = this.canvas.getActiveObject();

        const cropBoxTop = cropBox.top;

        const cropBoxLeft = cropBox.left;

        const heightCanvas = this.canvas.getHeight();
        const widthCanvas = this.canvas.getWidth();

        cropBox.set(
          'left',
          Math.min(
            Math.max(0, cropBoxLeft),
            widthCanvas - (cropBox.width + cropBox.strokeWidth)
          )
        );
        cropBox.set(
          'top',
          Math.min(
            Math.max(0, cropBoxTop),
            heightCanvas - (cropBox.height + cropBox.strokeWidth)
          )
        );
      });*/
  }

  reloadImage() {
    this._canvas.clear();
    this.loadImage();
  }

  applyFilter(filterName: Filter, value) {
    const img: any = this.getImage();
    const options = {};
    if (value) {
      options[filterName] = value;
    }

    const filter = this.filterFactory.instance(filterName, options);
    img.filters = [filter];
    img.applyFilters();
    this._canvas.renderAll();
  }

  removeAllFilter() {
    const img: any = this.getImage();
    img.filters = [];
    img.applyFilters();
    this._canvas.renderAll();
  }

  removeFilter(filterName: Filter) {
    const img: any = this.getImage();
    img.filters = img.filters.filter(obj => obj !== filterName);
    img.applyFilters();
    this._canvas.renderAll();
  }

  addFilter(filterName: Filter, value?) {
    const img: any = this.getImage();
    const options = {};
    if (value) {
      options[filterName.toLowerCase()] = value;
    }
    if (img.filters) {
      const index = img.filters.findIndex(x => x.type === filterName);
      if (index === -1) {
        const filter = this.filterFactory.instance(filterName, options);
        img.filters.push(filter);
      } else if (value !== undefined) {
        img.filters[index][filterName.toLowerCase()] = value;
      }
    } else {
      const filter = this.filterFactory.instance(filterName, options);
      img.filters = [filter];
    }

    img.applyFilters();
    this._canvas.renderAll();
  }

  scaleIn() {
    const image = this.getImage();
    image.scale(image.scaleX + 0.01);
    this._canvas.renderAll();
  }

  scaleOut() {
    const image = this.getImage();
    image.scale(image.scaleX - 0.01);
    this._canvas.renderAll();
  }

  rotate(degree) {
    const image = this.getImage();
    this.rotateTo(image.angle + degree);
  }

  rotateTo(degree) {
    const image = this.getImage();
    image.angle = degree;
    this._canvas.renderAll();
  }

  centerImage() {
    const image = this.getImage();
    this._canvas.centerObject(image);
    this._canvas.renderAll();
  }

  cropImage() {
    const cropBox = <CropBox>this._canvas.getObjects('cropbox')[0];
    const opt = {
      top: cropBox.cropBoxTop,
      left: cropBox.cropBoxLeft,
      width: cropBox.cropBoxWidth,
      height: cropBox.cropBoxHeight
    };
    if (this._cropperOptions && this._cropperOptions.resizeToWidth) {
      Object.assign(opt, opt, {
        multiplier: this._cropperOptions.resizeToWidth / opt.width
      });
    }
    cropBox.visible = false;
    const uri = this._canvas.toDataURL(opt);
    this.imageCropped.emit(uri);
    cropBox.visible = true;
    this._canvas.renderAll();
  }

  loadImage() {
    const imageOption: any = { crossOrigin: 'Anonymous' };
    fabric.Image.fromURL(
      this.imageUrl,
      image => {
        image.selectable = false;
        image.originX = 'center';
        image.originY = 'center';
        const scaleY = this._canvas.getHeight() / image.height;
        const scaleX = this._canvas.getWidth() / image.width;
        image.scale(Math.min(scaleY, scaleX));
        const movingBox = new CropBox({
          width: this._canvas.getWidth(),
          height: this._canvas.getHeight(),
          aspectRatio: 1,
          fill: 'transparent',
          hasBorders: true,
          hasControls: false,
          strokeWidth: 2,
          stroke: '#1565C0',
          selectable: false
        });

        this._canvas.add(image);
        this._canvas.centerObject(image);
        this._canvas.add(movingBox);
        this.imageLoaded.emit({ target: this });
        this.isLoading = false;
      },
      imageOption
    );
  }

  private getImage(): fabric.Image {
    const image = <fabric.Image>this._canvas.getObjects('image')[0];
    return image;
  }

  private dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const bb = new Blob([ab], {
      type: mimeString
    });
    return bb;
  }
  private renderOverlay() {
    const overlay = new fabric.Rect({
      width: this._canvas.getWidth(),
      height: this._canvas.getHeight(),
      fill: 'rgba(0, 0, 0, 0.5)',
      hasBorders: true,
      hasControls: false,
      strokeWidth: 0,
      selectable: false
    });
    this._canvas.add(overlay);
  }
}
/*
export class CropBox extends fabric.Rect {

  private widthContainer;
  private heightContainer;
  constructor(options, canvas: fabric.Canvas) {
    super(options);
    this.widthContainer = canvas.getWidth();
    this.heightContainer = canvas.getHeight();
  }

  _render(ctx: CanvasRenderingContext2D) {
    if (!this.visible) {
      return;
    }
 //   this.renderOverlay(ctx);
    const totalCell = 3;
    const boxTstrokeWith = this.strokeWidth;
    const distanceX = this.width / totalCell;
    const distanceY = this.height / totalCell;
    const top = -this.height / 2;
    const left = -this.width / 2;

    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    ctx.rect(left, top, this.width, this.height);
    ctx.stroke();

    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#FFFFFF';
    for (let i = 1; i < totalCell; i++) {
      ctx.beginPath();
      ctx.moveTo(left + distanceX * i, top + boxTstrokeWith);
      ctx.lineTo(left + distanceX * i, top + this.height - boxTstrokeWith);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(left + boxTstrokeWith, top + distanceY * i);
      ctx.lineTo(left + this.width - boxTstrokeWith, top + distanceY * i);
      ctx.stroke();
    }
    ctx.closePath();
  }

  renderOverlay(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const top = -this.heightContainer / 2;
    const left = -this.widthContainer / 2;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.rect(left, top, 1000, 1000);
    ctx.fill();
  }
}
*/

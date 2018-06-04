import {
  Directive,
  ElementRef,
  AfterViewInit,
  Renderer2,
  OnInit,
  Input
} from '@angular/core';
import { fabric } from 'fabric';
import { FilterFactoryService, Filter } from './filter-factory.service';

@Directive({
  selector: '[rtnImageFilter]'
})
export class ImageFilterDirective implements AfterViewInit, OnInit {
  private _canvas: fabric.StaticCanvas;

  @Input() originSrc: string;
  @Input() rtnImageFilter: Filter;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private filterFactory: FilterFactoryService
  ) {
    if (!(el.nativeElement instanceof HTMLImageElement)) {
      throw new Error('Tag element not valid');
    }
  }

  ngAfterViewInit(): void {}
  ngOnInit(): void {
    const filter = this.filterFactory.instance(this.rtnImageFilter);

    const canvasElement = this.renderer.createElement('canvas');
    this._canvas = new fabric.StaticCanvas(canvasElement);
    const imageOption: any = { crossOrigin: 'Anonymous' };
    fabric.Image.fromURL(
      this.originSrc,
      (image: any) => {
        image.filters.push(filter);
        image.applyFilters();
        this._canvas.setWidth(image.width);
        this._canvas.setHeight(image.height);
        this._canvas.add(image);
        const opt = {
          top: 0,
          left: 0,
          width: this._canvas.getWidth(),
          height: this._canvas.getHeight()
        };
        const uri = this._canvas.toDataURL(opt);
        this.renderer.setProperty(this.el.nativeElement, 'src', uri);
      },
      imageOption
    );
  }
}

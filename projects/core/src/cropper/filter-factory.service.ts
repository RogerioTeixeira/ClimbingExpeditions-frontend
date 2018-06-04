import { Injectable } from '@angular/core';
declare var fabric;
export type Filter =
  | 'Grayscale'
  | 'Invert'
  | 'Kodachrome'
  | 'Sepia'
  | 'Noise'
  | 'Polaroid'
  | 'Contrast'
  | 'BlackWhite'
  | 'Brownie'
  | 'Vintage'
  | 'Technicolor'
  | 'Saturation'
  | 'Brightness';
@Injectable()
export class FilterFactoryService {
  constructor() {}
  instance(filter: Filter, options?: any): any {
    switch (filter) {
      case 'Grayscale':
        return new fabric.Image.filters.Grayscale();
      case 'Sepia':
        return new fabric.Image.filters.Sepia();
      case 'Polaroid':
        return new fabric.Image.filters.Polaroid();
      case 'Noise':
        return new fabric.Image.filters.Noise(options);
      case 'BlackWhite':
        return new fabric.Image.filters.BlackWhite();
      case 'Brownie':
        return new fabric.Image.filters.Brownie();
      case 'Vintage':
        return new fabric.Image.filters.Vintage();
      case 'Invert':
        return new fabric.Image.filters.Invert();
      case 'Kodachrome':
        return new fabric.Image.filters.Kodachrome();
      case 'Saturation':
        return new fabric.Image.filters.Saturation(options);
      case 'Brightness':
        return new fabric.Image.filters.Brightness(options);
        case 'Contrast':
        return new fabric.Image.filters.Contrast(options);
    }
  }
}

import { Injectable } from '@angular/core';
import { Chart } from './chart';
import { Doughnut } from './doughnut';

@Injectable()
export class ChartFactoryService {
  constructor() {}

  public getChartCreator(chart: string): Chart<any> {
    switch (chart) {
      case 'doughnut':
        return new Doughnut();
    }

    return null;
  }
}

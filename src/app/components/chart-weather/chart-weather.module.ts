import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ChartWeatherComponent } from './chart-weather.component';

@NgModule({
  declarations: [ChartWeatherComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [ChartWeatherComponent]
})
export class ChartWeatherModule {}

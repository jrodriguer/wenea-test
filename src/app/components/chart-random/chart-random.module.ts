import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRandomComponent } from './chart-random.component';

@NgModule({
  declarations: [ChartRandomComponent],
  imports: [CommonModule],
  exports: [ChartRandomComponent]
})
export class ChartRandomModule {}

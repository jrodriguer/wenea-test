import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MapModule } from '../../components/map/map.module';
import { ModalDialogModule } from '../../components/modal-dialog/modal-dialog.module';
import { ChartWeatherModule } from '../../components/chart-weather/chart-weather.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    MapModule,
    ChartWeatherModule,
    ModalDialogModule
  ]
})
export class DashboardModule {}

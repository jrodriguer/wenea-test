import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartType, ChartDataset } from 'chart.js';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chart-weather',
  templateUrl: './chart-weather.component.html',
  styleUrls: ['./chart-weather.component.scss']
})
export class ChartWeatherComponent implements OnInit {
  public weatherData: ChartDataset[] = [];
  public weatherLabels: any[] = []; // fix error on importing labels from ng2-charts
  public weatherType: ChartType = 'bar';
  @Input() city: string = 'Madrid';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      // `http://cors-anywhere.herokuapp.com
      .get(
        `${environment.openweathermapApiUrl}/data/2.5/weather?q=${this.city}&APPID=${environment.openweathermapApiKey}`
      )
      .subscribe((res: any) => {
        this.weatherData = [
          {
            data: [
              res.main.temp,
              res.main.feels_like,
              res.main.temp_min,
              res.main.temp_max
            ],
            label: 'Temperature'
          }
        ];
        this.weatherLabels = ['Current', 'Feels Like', 'Min', 'Max'];
      });
  }
}

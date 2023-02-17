import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType, ChartDataset } from 'chart.js';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chart-weather',
  templateUrl: './chart-weather.component.html',
  styleUrls: ['./chart-weather.component.scss']
})
export class ChartWeatherComponent implements OnInit {
  public weatherData: ChartDataset[] = [];
  public weatherLabels: any[] = [];
  public weatherType: ChartType = 'bar';
  @Input() city: string = 'Madrid';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${environment.openweathermapApiKey}&units=metric`
      )
      .subscribe((response: any) => {
        this.weatherData = [
          {
            data: [
              response.main.temp,
              response.main.feels_like,
              response.main.temp_min,
              response.main.temp_max
            ],
            label: 'Temperature'
          }
        ];
        this.weatherLabels = ['Current', 'Feels Like', 'Min', 'Max'];
      });
  }
}

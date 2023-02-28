import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';

import { ChartWeatherComponent } from './chart-weather.component';

describe('ChartWeatherComponent', () => {
  let component: ChartWeatherComponent;
  let fixture: ComponentFixture<ChartWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgChartsModule, HttpClientTestingModule],
      declarations: [ChartWeatherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

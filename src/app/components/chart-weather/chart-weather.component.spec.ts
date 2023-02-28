import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWeatherComponent } from './chart-weather.component';

describe('ChartWeatherComponent', () => {
  let component: ChartWeatherComponent;
  let fixture: ComponentFixture<ChartWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

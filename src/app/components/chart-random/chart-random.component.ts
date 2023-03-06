import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-chart-random',
  templateUrl: './chart-random.component.html',
  styleUrls: ['./chart-random.component.scss']
})
export class ChartRandomComponent implements OnInit {
  private readonly currency = 'usd';
  private readonly days = 30;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService
      .getHistoricalPrices('bitcoin', this.currency, this.days)
      .subscribe((data: any) => {
        console.log({ data });

        new Chartist.LineChart('.ct-chart', {
          labels: data.prices.map((d: any) =>
            new Date(d[0]).toLocaleDateString()
          ),
          series: [data.prices.map((d: any) => d[1])]
        });
      });
  }
}

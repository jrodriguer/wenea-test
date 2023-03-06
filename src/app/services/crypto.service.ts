import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  getHistoricalPrices(id: string, currency: string, days: number) {
    const url = `${environment.criptoApiUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    return this.http.get(url);
  }
}

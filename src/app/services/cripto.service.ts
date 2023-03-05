import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getHistoricalPrices(id: string, currency: string, days: number) {
    const url = `${this.apiUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    return this.http.get(url);
  }
}

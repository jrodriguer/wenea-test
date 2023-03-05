import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocode(city: string): Observable<{ latitude: number; longitude: number }> {
    const url = `${environment.opencagegeocodingApiUrl}?q=${encodeURIComponent(
      city
    )}&key=${environment.opencagegeocodingApiKey}&limit=1&no_annotations=1`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const { lat, lng } = response.results[0].geometry;
        return { latitude: lat, longitude: lng };
      })
    );
  }
}

import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map: any;
  @Input() geoLocal: { latitude: number; longitude: number } | undefined;
  @Input() popup: string = '';

  constructor() {}

  ngOnInit() {
    this.map = L.map('map').setView([40.45, -3.8], 5);

    // base tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    if (this.geoLocal) {
      const marker = L.marker([
        this.geoLocal.latitude,
        this.geoLocal.longitude
      ]).addTo(this.map);
      marker.bindPopup(`<b>${this.popup}</b>`).openPopup();
    }
  }
}

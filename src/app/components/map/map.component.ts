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

  constructor() {}

  ngOnInit() {
    this.map = L.map('map').setView([40.45, -3.8], 5);

    // Add the base tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    // Add a marker to the map
    console.log(this.geoLocal);
    // const marker = L.marker([51.5, -0.09]).addTo(map);

    // Bind a popup to the marker
    // marker.bindPopup('<b>New York City</b>').openPopup();
  }
}

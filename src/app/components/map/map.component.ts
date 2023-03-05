import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

import { Address } from '../../../models/ddbb.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map: any;
  @Input() geolocal: Address = {} as Address;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map').setView([40.45, -3.8], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  }
}

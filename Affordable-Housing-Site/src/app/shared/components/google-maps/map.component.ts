import { Component, OnInit, ViewChild  } from '@angular/core';
import { GoogleMap,  GoogleMapsModule, MapCircle, MapInfoWindow, MapMarker, MapTransitLayer } from '@angular/google-maps';
import { markersDB } from '../../data/markers';


@Component({
  selector: 'app-google-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap;
  @ViewChild(MapCircle, { static: false })
  mapCircle!: MapCircle;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;
  isLoaded: boolean = false; 
  infoContent = ''
  markers: any[] = []

  zoom = 12
  
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 15,
    minZoom: 8,
  }
  constructor() { 
    this.markers = markersDB.Markers;
  }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 28.542111,
        lng: -81.37903,
      }

    })
  }
  
/*
      markerSettings = [{
        visible: true,
        shapeValuePath:'shape',
        colorValuePath:'color',
        dataSource: [this.markers]
    }]
*/
 
   
    
  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content
    this.info.open(marker)
  }
}


export {};
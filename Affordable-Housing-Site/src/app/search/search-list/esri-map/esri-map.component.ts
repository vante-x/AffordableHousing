
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { MapInfoWindow } from "@angular/google-maps";
import { loadModules } from "esri-loader";
import { fieldNames } from "esri/core/sql/WhereClause";
import * as LabelClass from "esri/layers/support/LabelClass";
import * as Map from "esri/Map";
import * as Content from "esri/popup/content/Content";
import * as FieldsContent from "esri/popup/content/FieldsContent";
import * as FieldInfo from "esri/popup/FieldInfo";
import * as PopupTemplate from "esri/PopupTemplate";
import { productsDB } from "src/app/shared/data/products";
import { energyDB } from "src/app/shared/data/energy";
import esri = __esri; // Esri TypeScript Types

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map

  @ViewChild("mapViewNode", { static: true })
  private mapViewEl!: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = "streets-navigation-vector"; //list of basemaps @ https://developers.arcgis.com/javascript/3/jsapi/esri.basemaps-amd.html#topo
  private _loaded = false;
  private _view!: esri.MapView;

  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView] = await loadModules([
        "esri/Map",
        "esri/views/MapView"
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map,
      };

      //function that adds points to the map
      this.setGraphics(map)
      
      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    // if (this._view) {
    //   // destroy the map view
    //   this._view.container = null;
    // }
  }

  setTitle(title: String) {
    return  "<font size='1.5'>" + title
  }
  //sets the markers onto the map by looping through the products database

  private setGraphics(map: esri.Map) {
    loadModules([
      'esri/layers/GraphicsLayer', 
      'esri/PopupTemplate', 
      'esri/geometry/Point', 
      'esri/Graphic', 
      'esri/geometry/support/webMercatorUtils',
      'esri/popup/FieldInfo',
      'esri/symbols/SimpleFillSymbol',
      'esri/popup/content/Content']).then(([GraphicsLayer, PopupTemplate, Point, Graphic, webMercatorUtils]) => { 
      
      var graphicsLayer = new GraphicsLayer();
  
      map.add(graphicsLayer)


  
      for (let energy of energyDB.energy){
        // Create a point
          var point = new Point ({
          longitude: energy.lng,
          latitude: energy.lat,
        });

        var SimpleFillSymbol = {
          type: "simple-marker", //
          color: energy.color, 
          size: energy.cirlceSize,
          style: "circle",
          Text: energy.energyRating,
          outline: {
            color: [0, 0, 0], // black
            width: 2
          },
          label: energy.energyRating
        };
          var pointGraphic = new Graphic({
          geometry: webMercatorUtils.geographicToWebMercator(point),
          symbol: SimpleFillSymbol
        });
        
/*
          var template = new PopupTemplate ({
         title: this.setTitle(product.name),
           // title: "Property Details",
          content: [{
            type: "text",
            text: 
            "<table ><tr><th style='border: 1px solid grey; padding: 10px''>Name:  </th> <td style='border: 1px solid grey; padding: 10px''> <a href='localhost:4200/contacts' style='color: #004B8D;'>" + product.name + "</a></td></tr>" +
            "<tr><th style='border: 1px solid grey; padding: 10px''>Address:  </th><td style='border: 1px solid grey; padding: 10px'>" + product.address + "</td></tr></table>"
          }]
        })
          ;

          pointGraphic.popupTemplate = template
*/
        graphicsLayer.add(pointGraphic);


      }
    })
    } 
  
  }
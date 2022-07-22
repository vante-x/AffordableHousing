
import {
  Injectable,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { loadModules } from "esri-loader";
import { productsDB } from "src/app/shared/data/products";
import { Product } from "src/app/shared/data/product";
import { energyDB } from "src/app/shared/data/energy";
import esri = __esri; // Esri TypeScript Types
import {ActivatedRoute} from '@angular/router';
import {} from 'esri/popup/FieldInfo';
import {} from 'esri/symbols/SimpleFillSymbol';
import {} from 'esri/popup/content/Content';
import { Point } from "esri/geometry";

@Component({
  selector: 'app-esri-details-map',
  templateUrl: './esri-details-map.component.html',
  styleUrls: ['./esri-details-map.component.scss']
})




@Injectable()
export class EsriDetailsMapComponent implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  
  //variable for property id pulled from url
  id: number;

  @ViewChild("mapViewNode", { static: true })
  private mapViewEl!: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 12;
  private _center: Array<number> = [-81.379234, 28.538336]; //centered on Orlando
  private _basemap = "streets-navigation-vector"; //list of basemaps @ https://developers.arcgis.com/javascript/3/jsapi/esri.basemaps-amd.html#topo
  private _loaded = false;
  private _view!: esri.MapView;
  
  myProduct: Product;

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

  getProducts(): Product[] {
    return productsDB.Product;
  }
  
  //find one product from the id in the query string
  getProduct(id: number): Product {
    return Product[id];
  }

  constructor(private route: ActivatedRoute) { 
    //pulls product id from url routerlink query
    // this.id is loading as one number above actual id; 
    //this subtracts 1 for accurate id number
    this.route.params.subscribe(params => {
      this.id = params['id'] - 1;
    });
    // get the one property for this id
    this.myProduct= productsDB.Product[this.id]
    this.center=[this.myProduct.lng,this.myProduct.lat];
  }



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
        center: this.center,
        zoom: this._zoom,
        map: map,
      };

      //function that adds point(s) to the map
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

  private setGraphics(map: esri.Map,) {
    
    loadModules([
      'esri/layers/GraphicsLayer', 
      'esri/PopupTemplate', 
      'esri/geometry/Point', 
      'esri/Graphic', 
      'esri/geometry/support/webMercatorUtils',
      'esri/popup/FieldInfo',
      'esri/symbols/SimpleFillSymbol',
      'esri/popup/content/Content',
      'esri/symbols/SimpleMarkerSymbol']).then(([GraphicsLayer, PopupTemplate, Point, Graphic, webMercatorUtils, SimpleMarkerSymbol]) => { 
    
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
            color:  energy.color,
            width: 1
          },
          label: energy.energyRating
        };
          var pointGraphic = new Graphic({
          geometry: webMercatorUtils.geographicToWebMercator(point),
          symbol: SimpleFillSymbol
        });
        
      //  graphicsLayer.add(pointGraphic);    

      }


        // Create a point
      var point = new Point ({
        longitude: this.myProduct.lng,
        latitude: this.myProduct.lat
      });

      var propertySymbol = {
        type: 'picture-marker',
        url: "https://maps.google.com/mapfiles/ms/icons/" + this.myProduct.color + ".png", 
        contentType: 'image/png',
        width: '36px',
        height: '32px',
        xoffset: -10,
        yoffset: 24
        };
        var pointGraphic = new Graphic({
        geometry: webMercatorUtils.geographicToWebMercator(point),
        symbol: propertySymbol
      });

      var homeMarkerTemplate = new PopupTemplate ({
        title: "Property Details",
        content: [
          {
            // Autocasts as new TextContent()
            type: "text",
            text: "<b>" + this.myProduct.name + "</b><br><b>Units</b>: " + this.myProduct.beds + "/" + this.myProduct.baths 
            + "<br><b>Rent</b>: $" + this.myProduct.price + "/month"
            + "<br><b>Utility Estimate</b>: $" + this.myProduct.utilityEstimate
          },
          {
            type: "media",
            mediaInfos: [
              {
                title: "",
                type: "image", // Autocasts as new ImageMediaInfo()
                caption: "",
                // Autocasts as new ImageMediaInfoValue()
                value: {
                  sourceURL: this.myProduct.image1
                }
              }
            ]
          }, 
          {
            // if attachments are associated with feature, display it.
            // Autocasts as new AttachmentsContent()
            type: "attachments"
          }
        ]
      });

        pointGraphic.popupTemplate = homeMarkerTemplate

      graphicsLayer.add(pointGraphic);   
    })
  }
}



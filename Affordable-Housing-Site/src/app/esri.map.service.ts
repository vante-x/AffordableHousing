import { loadModules } from "esri-loader";
import { productsDB } from "src/app/shared/data/products";
import { Product } from "src/app/shared/data/product";
import { energyDB } from "src/app/shared/data/energy";
import esri = __esri; // Esri TypeScript Types
import {ActivatedRoute} from '@angular/router';
import * as GraphicsLayer from 'esri/layers/GraphicsLayer';
import * as Point from 'esri/geometry/Point';
import * as Graphic from 'esri/Graphic';
import * as webMercatorUtils from 'esri/geometry/support/webMercatorUtils';
import {} from 'esri/popup/FieldInfo';
import {} from 'esri/symbols/SimpleFillSymbol';
import {} from 'esri/popup/content/Content';

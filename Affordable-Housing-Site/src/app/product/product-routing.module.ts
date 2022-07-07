import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsriDetailsMapComponent } from './product-details/esri-details-map/esri-details-map.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
//import { EsriMapComponent } from "./../search/search-list/esri-map/esri-map.component" ;

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailsComponent
  },
  
  {
    path: '',
    component: EsriDetailsMapComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule} from '@angular/material/expansion';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductHeroComponent } from './product-list/product-hero/product-hero.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
//import { EsriMapComponent } from "./../search/search-list/esri-map/esri-map.component" ;

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent, ProductHeroComponent],//,EsriMapComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatExpansionModule,
    
    NgxSkeletonLoaderModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({/*options*/})
  ]//, exports: [EsriMapComponent]
})
export class ProductModule { }

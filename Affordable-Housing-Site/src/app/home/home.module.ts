import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeProductsComponent } from './home-products/home-products.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DataSource } from '@angular/cdk/collections';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    HomeComponent, 
    HomeProductsComponent, 
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, 
     MatRadioModule, 
    MatAutocompleteModule, 
    ReactiveFormsModule, FormsModule, MatFormFieldModule, 
    MatInputModule,
    MatTableModule,
    ],
})
export class HomeModule {}

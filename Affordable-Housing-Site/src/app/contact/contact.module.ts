import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { MapComponent  } from '../shared/components/google-maps/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleLocationMapComponent } from './google-location-map/google-location-map.component';

@NgModule({
  declarations: [ContactComponent, MapComponent, GoogleLocationMapComponent ],
  imports: [CommonModule, ContactRoutingModule, SharedModule, GoogleMapsModule, HttpClientJsonpModule],
  exports: [MapComponent]
})
export class ContactModule {}

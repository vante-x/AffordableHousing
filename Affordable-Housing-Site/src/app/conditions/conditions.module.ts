import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionsRoutingModule } from './conditions-routing.module';
import { ConditionsComponent } from './conditions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ConditionsComponent],
  imports: [CommonModule, ConditionsRoutingModule, SharedModule]
})
export class ConditionsModule {}
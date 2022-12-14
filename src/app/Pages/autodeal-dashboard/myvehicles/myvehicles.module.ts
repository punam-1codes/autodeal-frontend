import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyvehiclesRoutingModule } from './myvehicles-routing.module';
import {MyvehiclesComponent} from './myvehicles.component';

@NgModule({
  declarations: [MyvehiclesComponent],
  exports: [
    MyvehiclesComponent
  ],
  imports: [
    CommonModule,
    MyvehiclesRoutingModule
  ]
})
export class MyvehiclesModule { }

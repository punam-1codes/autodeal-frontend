import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSidenavRoutingModule } from './dashboard-sidenav-routing.module';
import {DashboardSidenavComponent} from './dashboard-sidenav.component';

@NgModule({
  declarations: [DashboardSidenavComponent],
  exports: [DashboardSidenavComponent],
  imports: [
    CommonModule,
    DashboardSidenavRoutingModule
  ]
})
export class DashboardSidenavModule { }

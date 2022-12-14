import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutodealDashboardComponent } from './autodeal-dashboard.component';
import { AutodealDashboardRoutingModule } from './autodeal-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyordersComponent } from './myorders/myorders.component';
import { MyvehiclesComponent } from './myvehicles/myvehicles.component';
import { ProfilesettingsComponent } from './profilesettings/profilesettings.component';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { DashboardSidenavModule } from './dashboard-sidenav/dashboard-sidenav.module';
import { MyordersModule } from './myorders/myorders.module';
import { MyvehiclesModule } from './myvehicles/myvehicles.module';
import { ProfilesettingsModule } from './profilesettings/profilesettings.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AutodealDashboardComponent, DashboardSidenavComponent, MyordersComponent, MyvehiclesComponent, ProfilesettingsComponent,
  ],
  imports: [
    CommonModule, RouterModule,
    AutodealDashboardRoutingModule,
    FormsModule, ReactiveFormsModule,
    DashboardSidenavModule,
    MyordersModule,
    MyvehiclesModule,
    ProfilesettingsModule,

  ]
})
export class AutodealDashboardModule { }

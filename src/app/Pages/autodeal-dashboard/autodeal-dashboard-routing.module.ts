import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AutodealDashboardComponent } from './autodeal-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AutodealDashboardComponent,
    children: [
      {
        path: 'myorders',
        loadChildren: () => import('./myorders/myorders.module').then(m => m.MyordersModule),
      },
      {
        path: 'myvehicle',
        loadChildren: () => import('./myvehicles/myvehicles.module').then(m => m.MyvehiclesModule),
      },
      {
        path: 'profilesettings',
        loadChildren: () => import('./profilesettings/profilesettings.module').then(m => m.ProfilesettingsModule),
      },

    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AutodealDashboardRoutingModule { }
// export const homeRoute: ModuleWithProviders = RouterModule.forChild(route);

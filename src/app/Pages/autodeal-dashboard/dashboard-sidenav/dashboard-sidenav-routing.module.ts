import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSidenavComponent } from './dashboard-sidenav.component';


const routes: Routes = [
  { path: '', component: DashboardSidenavComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSidenavRoutingModule { }

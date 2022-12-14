import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyvehiclesComponent } from './myvehicles.component';

const routes: Routes = [
  { path: '', component: MyvehiclesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyvehiclesRoutingModule { }

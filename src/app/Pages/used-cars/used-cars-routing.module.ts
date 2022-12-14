import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsedCarsComponent } from './used-cars.component';
import { UsedCarDetailsComponent } from './used-car-details/used-car-details.component';

const routes: Routes = [

  {
    path: '',
    component: UsedCarsComponent,
  },
  {
    path: 'UsedCarDetails',
    component: UsedCarDetailsComponent,
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsedCarsRoutingModule { }

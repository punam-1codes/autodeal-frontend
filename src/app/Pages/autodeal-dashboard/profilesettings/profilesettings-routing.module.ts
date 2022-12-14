import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilesettingsComponent} from './profilesettings.component';

const routes: Routes = [
  { path: '', component: ProfilesettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesettingsRoutingModule { }

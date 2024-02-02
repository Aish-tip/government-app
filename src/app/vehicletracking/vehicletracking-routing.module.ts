import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicletrackingPage } from './vehicletracking.page';

const routes: Routes = [
  {
    path: '',
    component: VehicletrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicletrackingPageRoutingModule {}

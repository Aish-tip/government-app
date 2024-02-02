import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicletrackingPageRoutingModule } from './vehicletracking-routing.module';

import { VehicletrackingPage } from './vehicletracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicletrackingPageRoutingModule
  ],
  declarations: [VehicletrackingPage]
})
export class VehicletrackingPageModule { }

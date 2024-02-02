import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnonrecycPageRoutingModule } from './addnonrecyc-routing.module';

import { AddnonrecycPage } from './addnonrecyc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnonrecycPageRoutingModule
  ],
  declarations: [AddnonrecycPage]
})
export class AddnonrecycPageModule {}

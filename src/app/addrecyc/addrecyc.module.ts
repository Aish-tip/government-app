import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddrecycPageRoutingModule } from './addrecyc-routing.module';

import { AddrecycPage } from './addrecyc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddrecycPageRoutingModule
  ],
  declarations: [AddrecycPage]
})
export class AddrecycPageModule {}

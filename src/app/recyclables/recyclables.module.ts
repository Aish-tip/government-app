import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecyclablesPageRoutingModule } from './recyclables-routing.module';

import { RecyclablesPage } from './recyclables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecyclablesPageRoutingModule
  ],
  declarations: [RecyclablesPage]
})
export class RecyclablesPageModule {}

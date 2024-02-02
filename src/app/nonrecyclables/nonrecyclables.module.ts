import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonrecyclablesPageRoutingModule } from './nonrecyclables-routing.module';

import { NonrecyclablesPage } from './nonrecyclables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonrecyclablesPageRoutingModule
  ],
  declarations: [NonrecyclablesPage]
})
export class NonrecyclablesPageModule { }

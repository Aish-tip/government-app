import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IonicModule } from '@ionic/angular';
import { CanvasJSChart } from 'src/assets/canvasjs/canvasjs.angular.component';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, MatDatepickerModule, MatFormFieldModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, CanvasJSChart]
})
export class FolderPageModule { }

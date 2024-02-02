import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnonrecycPage } from './addnonrecyc.page';

const routes: Routes = [
  {
    path: '',
    component: AddnonrecycPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnonrecycPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddrecycPage } from './addrecyc.page';

const routes: Routes = [
  {
    path: '',
    component: AddrecycPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddrecycPageRoutingModule {}

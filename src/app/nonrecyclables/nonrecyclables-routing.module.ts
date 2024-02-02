import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonrecyclablesPage } from './nonrecyclables.page';

const routes: Routes = [
  {
    path: '',
    component: NonrecyclablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonrecyclablesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'folder',
        loadChildren: () => import('../folder/folder.module').then(m => m.FolderPageModule)

      },
      {
        path: 'folder/:id',
        loadChildren: () => import('../folder/folder.module').then(m => m.FolderPageModule)

      },
      {
        path: 'customerlist',
        loadChildren: () => import('../customerlist/customerlist.module').then(m => m.CustomerlistPageModule)
      },
      {
        path: 'vehicletracking',
        loadChildren: () => import('../vehicletracking/vehicletracking.module').then(m => m.VehicletrackingPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoauthGuard } from './guard/noauth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [NoauthGuard] },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  }, {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'recyclables',
    loadChildren: () => import('./recyclables/recyclables.module').then(m => m.RecyclablesPageModule)
  },
  {
    path: 'nonrecyclables',
    loadChildren: () => import('./nonrecyclables/nonrecyclables.module').then(m => m.NonrecyclablesPageModule)
  },
  {
    path: 'availability',
    loadChildren: () => import('./availability/availability.module').then(m => m.AvailabilityPageModule)
  },
  {
    path: 'customerlist',
    loadChildren: () => import('./customerlist/customerlist.module').then(m => m.CustomerlistPageModule)
  },
  {
    path: 'vehicletracking',
    loadChildren: () => import('./vehicletracking/vehicletracking.module').then(m => m.VehicletrackingPageModule)
  },
  {
    path: 'addrecyc',
    loadChildren: () => import('./addrecyc/addrecyc.module').then(m => m.AddrecycPageModule)
  },
  {
    path: 'addnonrecyc',
    loadChildren: () => import('./addnonrecyc/addnonrecyc.module').then(m => m.AddnonrecycPageModule)
  },
  {
    path: 'imagemodal',
    loadChildren: () => import('./imagemodal/imagemodal.module').then(m => m.ImagemodalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

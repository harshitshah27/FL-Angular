
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LandingComponent } from './modules/landing/landing.component';
import { SettingsComponent } from './modules/settings/settings.component';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'settings',
    component: SettingsComponent,
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes,
//     {
//       initialNavigation: 'enabled'
//     }),


//   ],

//   bootstrap: [AppComponent,],
//   exports: [RouterModule],

// })

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

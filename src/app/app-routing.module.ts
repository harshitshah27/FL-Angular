
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LandingComponent } from './modules/landing/landing.component';
const routes: Routes = [
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate:[ MsalGuard  ]
  // },
  {
    path: '',
    component: LandingComponent,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'user',
    component: HomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  }
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

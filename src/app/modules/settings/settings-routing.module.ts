import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  {
    path: 'account-details',
    component: AccountDetailsComponent
  },
  {
    path: 'security',
    component: SecurityComponent
  },
  {
    path: '',
    redirectTo: 'account-details',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

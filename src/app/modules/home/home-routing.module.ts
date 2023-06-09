import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRideComponent } from './create-ride/create-ride.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'create-ride',
    component: CreateRideComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

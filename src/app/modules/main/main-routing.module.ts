import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { OrganizationScreenComponent } from './components/organization-screen/organization-screen.component';
import { DownloadComponent } from '../main/components/download/download.component';
import { InteractionListComponent } from './components/interaction-list/interaction-list.component';
import { InteractionPageComponent } from './components/interaction-page/interaction-page.component';
import { AgentMakerComponent } from './components/agent-maker/agent-maker.component';
import { AddBatchPageComponent } from './components/add-batch/add-batch-page-component';

const routes: Routes = [
  {
    path: 'batch',
  component: AgentMakerComponent,
  data: {
    shouldReuse: false
  },
  canActivate: [AuthGuard]
  },
  {
    path: 'batch/new',
  component: AddBatchPageComponent,
  data: {
    shouldReuse: false
  },
  canActivate: [AuthGuard]
  },
 
 
  {
    path: 'settings',
    component: OrganizationScreenComponent,
    data: {
      shouldReuse: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'interactions',
    component: InteractionListComponent,
    data: {
      shouldReuse: false
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'interactions/:id',
    component: InteractionPageComponent,
    data: {
      shouldReuse: false
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'download',
    component: DownloadComponent,
    data: {
      shouldReuse: false
    },
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

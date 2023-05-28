import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AddAgentsComponent } from './components/add-agents/add-agents.component';
import { AgentMakerComponent } from './components/agent-maker/agent-maker.component';
import { AddBatchPageComponent } from './components/add-batch/add-batch-page-component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InteractionListComponent } from './components/interaction-list/interaction-list.component';
import { InteractionPageComponent } from './components/interaction-page/interaction-page.component';
import { AdminSettingsPageComponent } from './components/admin-settings-page/admin-settings-page.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DownloadComponent } from './components/download/download.component';
import { ViewAgentDetailsDialogComponent } from './components/view-agent-details-dialog/view-agent-details-dialog.component';
import { ConclusionScreenComponent } from './components/conclusion-screen/conclusion-screen.component';
import { OrganizationScreenComponent } from './components/organization-screen/organization-screen.component';


@NgModule({
  declarations: [
    AddAgentsComponent,
    AgentMakerComponent,
    AddBatchPageComponent,
    ConclusionScreenComponent,
    ViewAgentDetailsDialogComponent,
    InteractionListComponent,
    InteractionPageComponent,
    AdminSettingsPageComponent,
    DownloadComponent,
    OrganizationScreenComponent
  ],
  imports: [

    CommonModule,
    MatDialogModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule,
    SharedModule,
    MatButtonToggleModule,
    FormsModule,
    MatSidenavModule,
    MatSelectModule,
    InfiniteScrollModule,
    MatStepperModule
  ],
  entryComponents: [
    ViewAgentDetailsDialogComponent,
  ],
  exports: [
    MatDialogModule,
    MatSidenavModule
  ]
})
export class MainModule { }

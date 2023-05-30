import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateRideComponent } from './create-ride/create-ride.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    CreateRideComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    MatChipsModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatRadioModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SecurityComponent } from './security/security.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    SettingsComponent,
    AccountDetailsComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class SettingsModule { }

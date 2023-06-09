import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { HomeModule } from '../home/home.module';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SecurityComponent } from './security/security.component';


@NgModule({
  declarations: [
    SettingsComponent,
    AccountDetailsComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    HomeModule
  ]
})
export class SettingsModule { }

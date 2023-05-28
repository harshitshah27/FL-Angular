import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DataTablesModule } from 'angular-datatables';
import { MatSelectModule } from '@angular/material/select';
import { TotalCardComponent } from './components/total-card/total-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UserConfirmationDialogComponent } from './components/user-confirmation-dialog/user-confirmation-dialog.component';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ 
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NavigationBarComponent,
    TotalCardComponent,
    UserConfirmationDialogComponent,
    CommonDialogComponent,
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NgxSpinnerModule,
    DataTablesModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  exports: [
    LayoutComponent, 
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    DataTablesModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    NavigationBarComponent

  ],
  providers: [
    AuthGuard,
    NoAuthGuard
  ]
})
export class SharedModule { }

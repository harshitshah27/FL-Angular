import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarMsgComponent } from './components/snackbar-msg/snackbar-msg.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationBarComponent,
    CommonDialogComponent,
    SnackbarMsgComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
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

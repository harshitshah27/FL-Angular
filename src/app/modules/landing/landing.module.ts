import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingComponent } from "./landing.component";
import { LandingRoutingModule } from "./landing-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { VerifyLoginComponent } from "./verify-login/verify-login.component";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    VerifyLoginComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
})
export class LandingModule { }

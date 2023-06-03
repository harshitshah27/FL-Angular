import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingComponent } from "./landing.component";
import { LandingRoutingModule } from "./landing-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { VerifyLoginComponent } from "./verify-login/verify-login.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";

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
    MatFormFieldModule,
    MatGridListModule,
  ],
})
export class LandingModule {}

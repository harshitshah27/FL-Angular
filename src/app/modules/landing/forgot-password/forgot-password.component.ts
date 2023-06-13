import { Component } from "@angular/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
  email: string = "";

  constructor() {}

  ngOnInit(): void {}

  ForgetPassword() {
    console.log(this.email);
  }
}

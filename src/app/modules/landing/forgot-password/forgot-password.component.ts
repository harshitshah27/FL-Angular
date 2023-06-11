import { Component } from "@angular/core";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
  email: string = "";
  password: string = "";

  constructor() {}

  ngOnInit(): void {}

  doLogin() {
    console.log(this.email);
    console.log(this.password);
  }
}

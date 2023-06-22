import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  viewNewPasswordHint: boolean = false;
  viewConfirmPasswordHint: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  signUp() {
    console.log(this.firstName);
    console.log(this.lastName);
  }

  passwordOnChange(event: any) {
    const newPwdVal = event.target?.value;

    if ((newPwdVal.length >= 8) &&
      (/[a-z]/.test(newPwdVal)) &&
      (/[A-Z]/.test(newPwdVal)) &&
      (/[!@#$%^&*(),.?\":{}|<>]/.test(newPwdVal)) &&
      (/[0-9]/.test(newPwdVal))) {
      this.viewNewPasswordHint = false;
    } else {
      this.viewNewPasswordHint = true;
    }
  }

  confirmPasswordChange(event: any) {
    const confirmPwdVal = event.target?.value;

    if (this.newPassword.toUpperCase() == (confirmPwdVal.toUpperCase())) {
      this.viewConfirmPasswordHint = false;
    } else {
      this.viewConfirmPasswordHint = true;
    }
  }
}

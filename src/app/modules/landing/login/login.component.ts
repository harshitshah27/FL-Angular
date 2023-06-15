import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  doLogin() {
    // check if valid
    // if (login success) {
    this.router.navigate(['/dashboard']);
    this.authService.signIn();
    // }
  }
}

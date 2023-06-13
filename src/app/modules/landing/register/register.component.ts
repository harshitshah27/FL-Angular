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

  constructor() {}

  ngOnInit(): void {}

  SignUp() {
    console.log(this.firstName);
    console.log(this.lastName);
  }
}

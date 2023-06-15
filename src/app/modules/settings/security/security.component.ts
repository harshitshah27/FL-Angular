import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  currentPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  passwordCriteriaList: any[] = [
    {
      id: 1,
      label: "Length of characters",
      isFulfilled: false
    },
    {
      id: 2,
      label: "Lowercase letter",
      isFulfilled: false
    },
    {
      id: 3,
      label: "Uppercase letter",
      isFulfilled: false
    },
    {
      id: 4,
      label: "Number",
      isFulfilled: false
    },
    {
      id: 5,
      label: "Special Character",
      isFulfilled: false
    },
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  passwordOnChange = (event: any) => {
    const value = event.target.value
    this.passwordCriteriaList = [
      {
        id: 1,
        label: "Length of characters",
        isFulfilled: value.length > 8
      },
      {
        id: 2,
        label: "Lowercase letter",
        isFulfilled: /[a-z]/.test(value)
      },
      {
        id: 3,
        label: "Uppercase letter",
        isFulfilled: /[A-Z]/.test(value)
      },
      {
        id: 4,
        label: "Number",
        isFulfilled: /[0-9]/.test(value)
      },
      {
        id: 5,
        label: "Special Character",
        isFulfilled: /[!@#$%^&*(),.?\":{}|<>]/.test(value)
      },
    ];
  }

  clearChanges() {
    if (this.currentPassword.length > 0 || this.newPassword.length > 0 || this.confirmPassword.length > 0) {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    } else {
      this.router.navigate(['/dashboard']);
    }

  }

  saveChanges() {
    console.log(this.currentPassword);
    console.log(this.newPassword);
    console.log(this.confirmPassword);
  }

}

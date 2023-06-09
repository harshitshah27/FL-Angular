import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges() {
    console.log(this.currentPassword);
    console.log(this.newPassword);
    console.log(this.confirmPassword);
  }

}

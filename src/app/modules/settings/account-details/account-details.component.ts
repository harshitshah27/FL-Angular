import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  userProfileImg: string = "";
  userImageText: string = "";
  firstName: string = "Test";
  lastName: string = "User";
  email: string = "testUser@test.com";

  constructor() { }

  ngOnInit(): void {
    this.prepareCustomerImage();
  }

  prepareCustomerImage() {
    let name = this.firstName + " " + this.lastName;
    if (name) {
      let a = name.split(' ');
      if (a.length >= 2) {
        this.userImageText = a[0][0] + a[1][0];
      } else if (a[0].length >= 2) {
        this.userImageText = a[0][0] + a[0][1]
      } else {
        this.userImageText = a[0][0]
      }
    }
  }

  saveChanges() {
    console.log(this.email);
    console.log(this.firstName);
    console.log(this.lastName);
  }

}

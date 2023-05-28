import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username: string = 'Ajayduj.1';
  status: boolean = true;
  emailAddress: string = "ayaj.dujhal@gmail.com";
  lastLogin: string = "06/12/2021 17:12:45";
  name: string = "Ajay Dughal";
  totalInteractions: number = 25642;
  contactNumber: number = 1234567890;
  profileUrl: string | null = null;
  userImageText: string = 'Da';

  fileToUpload: File | null = null;
  isAdmin: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserProfileComponent>,
  ) { }

  ngOnInit(): void {
    this.username = this.data.name;
    this.name = this.data.name;
    this.prepareCustomerImage(this.name);
    this.emailAddress = this.data.emailAddress;
    this.lastLogin = this.data.lastLogin;
    this.contactNumber = this.data.contactNumber;
    this.isAdmin = this.data.isAdmin;
    if (this.data.totalInteractions) {
      this.totalInteractions = this.data.totalInteractions;
    }
    if (this.data.profileUrl) {
      this.profileUrl = this.data.profileUrl;
    }
  }

  closeDialog() {
    this.dialogRef.close("hello");
  }

  handleFileInput(event: any) {
    if (event && event.target && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
    }
  }

  prepareCustomerImage(name: string | undefined) {
    if (name) {
      let a = name.split(' ');
      if (a.length === 2) {
        this.userImageText = a[0][0] + a[1][0];
      } else {
        this.userImageText = a[0][0] + a[0][1]
      }
    }
  }
}

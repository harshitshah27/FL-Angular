import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | undefined;
  userProfileImg: string | ArrayBuffer | null = "";
  userImageText: string = "";
  firstName: string = "Test";
  lastName: string = "User";
  email: string = "testUser@test.com";

  constructor(public router: Router) { }

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

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: any) {
    // Handle the selected file(s) here
    this.selectedFile = event.target.files[0];
    this.readFile();
  }

  readFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userProfileImg = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  saveChanges() {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-agent-details-dialog',
  templateUrl: './view-agent-details-dialog.component.html',
  styleUrls: ['./view-agent-details-dialog.component.scss']
})
export class ViewAgentDetailsDialogComponent implements OnInit {

  username: string = 'Ajayduj.1';
  status: boolean = true;
  emailAddress: string = "ayaj.dujhal@gmail.com";
  lastLogin: string = "06/12/2021 17:12:45";
  name: string = "Ajay Dughal";
  totalInteractions: number = 25642;
  contactNumber: number = 1234567890;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewAgentDetailsDialogComponent>,
  ) {
    this.username = this.data.name;
    this.name = this.data.name;
    this.status = this.data.status;
    this.emailAddress = this.data.emailAddress;
    this.lastLogin = this.data.lastLogin;
    this.contactNumber = this.data.contactNumber;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close("hello");
  }
}

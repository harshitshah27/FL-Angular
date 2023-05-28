import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-confirmation-dialog',
  templateUrl: './user-confirmation-dialog.component.html',
  styleUrls: ['./user-confirmation-dialog.component.scss']
})
export class UserConfirmationDialogComponent implements OnInit {

  isNoBottomPadding = false;
  inputTextValue: string = "";
  showInputText = false;
  constructor(
    public dialogRef: MatDialogRef<UserConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      if (this.data.type === 'no-bottom-padding') {
        this.isNoBottomPadding = true;
      }
      if (this.data.showInputText) {
        this.showInputText = true;
      }
    }
  }

  onFooterbuttonClick(event: any, buttonData: any) {
    this.dialogRef.close({ ...buttonData.response, inputTextValue: this.inputTextValue });
  }

  onCancel(event: any) {
    this.dialogRef.close(this.data.cancelButton.response);
  }
}

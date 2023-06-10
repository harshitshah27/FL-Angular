import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-msg',
  templateUrl: './snackbar-msg.component.html',
  styleUrls: ['./snackbar-msg.component.scss']
})
export class SnackbarMsgComponent implements OnInit {

  @Input() data: any;

  constructor(private snackbarRef: MatSnackBarRef<SnackbarMsgComponent>) { }

  ngOnInit(): void {
  }

  closeSnackBar() {
    this.snackbarRef.dismiss();
  }

}

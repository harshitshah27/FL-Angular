import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMsgComponent } from '../modules/shared/components/snackbar-msg/snackbar-msg.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(dataObj: any) {
    const snackbarRef = this.snackBar.openFromComponent(SnackbarMsgComponent,
      {
        duration: 3000,
        panelClass: "custom-snackbar",
        horizontalPosition: "right",
        verticalPosition: "top"
      });
    snackbarRef.instance.data = dataObj;

    return snackbarRef;
  }
}
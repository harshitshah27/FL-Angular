import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conclusion-screen',
  templateUrl: './conclusion-screen.component.html',
  styleUrls: ['./conclusion-screen.component.scss']
})
export class ConclusionScreenComponent implements OnInit {

  interactionId: string = '00000';
  conclusion: string = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id rerum ipsa a architecto esse! Veritatis dolore animi eveniet quod nihil, ut rem placeat non nesciunt eaque incidunt vitae, ex reprehenderit?`

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConclusionScreenComponent>
  ) { }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.interactionId) {
        this.interactionId = this.data.interactionId;
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  conclusionEmitter(e: any) {
    this.conclusion = e;
  }
}

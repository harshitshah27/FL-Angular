import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiCallService } from './../../../../services/api-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.scss']
})
export class AddAgentsComponent implements OnInit {

  addEditAgentForm: FormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
  })
  id: string = '';
  isAdmin: boolean = false;

  headerTitle: string | undefined;
  isEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddAgentsComponent>,
    private formBuilder: FormBuilder,
    private apiCallService: ApiCallService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.title) {
        this.headerTitle = this.data.title;
        this.isEdit = this.data.isEdit
        this.id = this.data.id;
      }
      if (this.data.isAdmin) {
        this.isAdmin = true
      }
      if (this.data.isInvited) {
        this.addEditAgentForm.controls['emailAddress'].disable();
      }
      if (this.data.emailAddress && this.data.name && this.data.contactNumber) {
        this.addEditAgentForm.patchValue({
          emailAddress: this.data.emailAddress,
          name: this.data.name,
          contactNumber: this.data.contactNumber
        })
      }
    }
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.closeDialog();
      }
    })
  }

  saveAgent(event: Event) {
    event.preventDefault();
    if (!this.addEditAgentForm.valid || !this.addEditAgentForm.touched) {
      return;
    }
    if (this.isEdit) {
      this.editAgent();
    } else {
      this.createAgent();
    }
  }

  editAgent() {
    const payload: any = {}
    if (this.addEditAgentForm.controls['emailAddress'].dirty) {
      payload['email'] = this.addEditAgentForm.controls['emailAddress'].value
    }
    if (this.addEditAgentForm.controls['name'].dirty) {
      payload['name'] = this.addEditAgentForm.controls['name'].value
    }
    if (this.addEditAgentForm.controls['contactNumber'].dirty) {
      payload['mobileNumber'] = this.addEditAgentForm.controls['contactNumber'].value
    }
    this.dialogRef.close({ id: this.id, ...payload });
  }

  createAgent() {
    const payload = {
      email: this.addEditAgentForm.controls['emailAddress'].value,
      name: this.addEditAgentForm.controls['name'].value,
      mobileNumber: this.addEditAgentForm.controls['contactNumber'].value,
      role: this.isAdmin ? 'Admin' : 'Agent'
    }
    this.apiCallService.sendPostRequest('user/create-user', payload, true).then((res: any) => {
      this.dialogRef.close();
      this.snackBar.open(res.message, 'Dismiss', {
        duration: 2000
      })
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

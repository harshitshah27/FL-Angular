import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
  ) { }
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  ngOnInit(): void {
  }

  onClickSignIn(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const payload = {
      email: this.loginForm.controls['email'].value,
    };
    this.apiCallService.sendPostRequest('auth/forgot-password', payload, false).then((res: any) => {
      if (res && res.data) {
        this.router.navigate(['/sign-in']);
      }
    })

  }
}

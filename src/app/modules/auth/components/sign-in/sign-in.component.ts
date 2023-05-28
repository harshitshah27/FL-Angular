import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  hide: boolean = true;
  email: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm.controls['email'].setValue(localStorage.getItem("user-email") ? localStorage.getItem("user-email") : ' ');
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onClickSignIn(): void {
    if (!this.loginForm.valid) {
      return;
    }
    localStorage.setItem("user-email", this.loginForm.controls['email'].value);
    const payload = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.apiCallService.sendPostRequest('auth/sign-in', payload, false).then((res: any) => {
      if (res && res.data) {
        localStorage.setItem('token', res.data.accessToken);
        // this.authService.currentLoggedInUser$.subscribe((result: any) => {
          // if (result) {
            if (res.data.role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/interactions']);
            }
            this.authService.signIn();
          // }
        // })
      }
    })
    // .catch((err) => {
    //   if (err && err.errorInRequest && err.errorInRequest.error && err.errorInRequest.error.message) {
    //     this.snackBar.open(err.errorInRequest.error.message, 'Dismiss', {
    //       duration: 2000
    //     })
    //   }
    // })
  }

  ngOnDestroy(): void {
      // this.authService.currentLoggedInUser$.unsubscribe()
  }
  
}

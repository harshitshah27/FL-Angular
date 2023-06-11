import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name: string | undefined = "Test user";
  currentUser: any;
  userImageText: string = 'TU';


  email: string = "testUser@test.com";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.authService.currentLoggedInUser$.subscribe((loggedInUser) => {
      if (loggedInUser) {
        this.name = loggedInUser.name;
        this.currentUser = loggedInUser;

        this.prepareCustomerImage(this.name);
      }
    });
  }

  onClickSignOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  openAccountDetails() {
    this.router.navigate(['/settings/account-details']);
  }

  onClickSecurity() {
    this.router.navigate(['/settings/security']);
  }

  ngOnDestroy() {
    // this.authService.currentLoggedInUser$.unsubscribe();
  }

  prepareCustomerImage(name: string | undefined) {
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
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from 'src/app/modules/auth/components/user-profile/user-profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navigationList: any[] = [];
  name: string | undefined;
  currentUser: any;
  userImageText: string = 'Da';
  isAdmin: boolean = true;
  orgLogo: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService,
    private dialog: MatDialog,
  ) { }

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.navigationService.getNavigationList().subscribe((navigationList) => {
      this.navigationList = navigationList;
    });
    this.authService.currentLoggedInUser$.subscribe((loggedInUser) => {
      
      if (loggedInUser) {
        this.name = loggedInUser.name
        this.currentUser = loggedInUser;
        if (this.currentUser && this.currentUser.role === 'Admin') {
          this.isAdmin = true
        }
        this.prepareCustomerImage(this.name)
        this.toggleSidebar.emit();
      }
    });
    this.authService.orgData$.subscribe((res: any) => {
      if (res) {
        this.orgLogo = res.logo;
      }
    });
  }

  getTitle() {
    let title = 'Dashboard';
    if (this.router.url.substring(1, 9) === 'settings') {
      title = 'Settings'
    } else {
      this.navigationList.forEach((item) => {
        if (this.router.url.substring(0, item.url.length) == item.url) {
          title = item.title;
        }
      })
    }
    return title;
  }


  onClickSignOut() {
    this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

  sidebarToggled() {
    this.toggleSidebar.emit();
  }

  openUserProfile() {
    const dialogRef = this.dialog.open(UserProfileComponent,
      {
        disableClose: false,
        autoFocus: true,
        data: {
          emailAddress: this.currentUser.email,
          name: this.currentUser.name,
          contactNumber: this.currentUser.mobileNumber,
          lastLogin: this.currentUser.lastLoginTime,
          avatar: this.currentUser.avatar,
          totalInteractions: this.currentUser.totalInteractions,
          isAdmin: this.currentUser.role === 'Admin' ? true : false
        },
        panelClass: 'view-details-agents-dialog'
      });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onClickSettings() {
    this.router.navigate(['/settings']);
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

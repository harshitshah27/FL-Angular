import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    let navItemList: any = [];
    // this.authService.currentLoggedInUser$.subscribe((loggedInUser) => {
    //   if (loggedInUser) {

          navItemList = [
            {
              url: '/dashboard',
              icon: 'dashboard_customize',
              title: 'Dashboard'
            },
            {
              url: '/support',
              icon: 'support_agent',
              title: 'Agents'
            },
            {
              url: '/interactions',
              icon: 'confirmation_number',
              title: 'Interactions'
            },
            {
              url: '/search',
              icon: 'search',
              title: 'Search'
            },
            {
              url: '/download',
              icon: 'file_download',
              title: 'Downloads'
            },            
            {
              url: '/mdm',
              icon: 'source',
              title: 'Master Data Management'
            }
          ]
       
      // }
      this.navigationService.setNavigationList(navItemList);
    // })
  }

  ngOnDestroy() {
    // this.authService.currentLoggedInUser$.unsubscribe();
  }

}

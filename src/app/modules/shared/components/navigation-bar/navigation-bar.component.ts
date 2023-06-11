import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  selectedTabId: number = -1;

  navigationList: any[] = [
    {
      id: 1,
      title: "Dashboard",
      imgSrc: "../assets/dashboard.svg",
      imgAltText: "Dashboard",
      imgClass: "dashboard-logo",
      route: "dashboard"
    },
  ];

  constructor(
    private router: Router,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit(): void {
    this.navigationService.getRouterUrl().subscribe(res => {
      let routerUrl = res.toString();
      let urlSegments = routerUrl.split('/').filter((x: string) => x.length > 0);
      this.selectedTabId = -1;
      this.navigationList.forEach((item) => {
        if (urlSegments[0] == item.route) {
          this.selectedTabId = item.id;
        }
      })
    });
  }

  handleNavigation(item: any) {
    if (this.selectedTabId != item.id) {
      this.router.navigate([item.route]);
    }
  }

}

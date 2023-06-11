import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  navigationList: any[] = [
    {
      id: 1,
      title: "Account Details",
      route: "/settings/account-details"
    },
    {
      id: 2,
      title: "Security",
      route: "/settings/security"
    },
  ];

  selectedTabId = 1;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    this.route.url.subscribe(res => {
      let currentPath = this.router.url;
      this.navigationService.setRouterUrl(currentPath);
      this.navigationList.forEach((item) => {
        if (currentPath == item.route) {
          this.selectedTabId = item.id;
        }
      })
    });
  }

  ngOnInit(): void {
  }

  handleNavigation(item: any) {
    this.selectedTabId = item.id;
    this.router.navigate([item.route]);
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      route: "/dashboard/settings/account-details"
    },
    {
      id: 2,
      title: "Security",
      route: "/dashboard/settings/security"
    },
  ];

  selectedTabId = 1;

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.url.subscribe(res => {
      this.navigationList.forEach((item) => {
        if (this.router.url == item.route) {
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

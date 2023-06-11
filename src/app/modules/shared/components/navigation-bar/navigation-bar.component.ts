import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void { }

  handleNavigation(item: any) {
    if (this.selectedTabId != item.id) {
      this.router.navigate([item.route]);
    }
  }

}

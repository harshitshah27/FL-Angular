import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  selectedTabId: number = 1;

  navigationList: any[] = [
    {
      id: 1,
      title: "Dashboard",
      imgSrc: "",
      imgAltText: "Das",
      route: "/user/dashboard"
    },
    {
      id: 2,
      title: "Create ride",
      imgSrc: "",
      imgAltText: "abc",
      route: "/user/create-ride"
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.url.subscribe(res => {
      this.navigationList.forEach((item) => {
        if (this.router.url == item.route) {
          this.selectedTabId = item.id;
        }
      })
    });
  }

  

  ngOnInit(): void {}

  handleNavigation(item:any) {
    this.router.navigate([item.route]);
  }

}

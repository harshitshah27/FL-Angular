import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  currentYear: number = 2021;

  constructor(
    private navigationService: NavigationService,
    private route: Router,
  ) { }

  navigationList: any[] = [];

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.navigationService.getNavigationList().subscribe((navigationList) => {
      this.navigationList = navigationList;
    });
  }

  getCurrentUrl(url: string) {
    if (url === this.route.url.substring(0, url.length)) {
      return true;
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbObjectType, breadcrumbData } from './enums/breadcrumbMappingEnum';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mainHeaderText = "";
  routeUrlSegments: BreadcrumbObjectType[] = [];
  showBreadCrumb: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,) {
    this.route.url.subscribe(params => {
      let currentPath = this.router.url;
      this.navigationService.setRouterUrl(currentPath);
      let urlSegments = this.router.url.split('/').filter(x => x.length > 0);
      urlSegments.forEach(path => {
        path = path.split('?')[0];
        console.log(path);

        let routeObj: BreadcrumbObjectType | undefined = breadcrumbData.find(item => item.path === path);
        console.log(routeObj);

        if (routeObj) {
          this.mainHeaderText = routeObj.mainHeaderText;
          this.showBreadCrumb = routeObj.showBreadCrumb;
          this.routeUrlSegments.push(routeObj);
        }
      })
    });
  }

  ngOnInit(): void {
  }

}

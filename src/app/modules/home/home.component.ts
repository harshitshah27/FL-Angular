import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumbMappingEnum } from './enums/breadcrumbMappingEnum';
import * as breadcrumbJson from "./enums/helper.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mainHeaderText = "";
  isDashboard = true;
  routeUrlSegments: any[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router) {
    // console.log(this.route);
    this.route.url.subscribe(params => {
      let currentPath = this.router.url;
      let urlSegments = this.router.url.split('/').filter(x => x.length > 0);
      let preparedPath = "";
      urlSegments.forEach(path => {
        preparedPath = preparedPath + "/" + path;
        if (path == BreadCrumbMappingEnum.DASHBOARD) {
          this.isDashboard = true;
          this.mainHeaderText = "DASHBOARD";
        } else {
          this.isDashboard = false;
          this.mainHeaderText = "RIDES";
        }
        // const obj = {
        //   path: path,
        //   hrefLink: window.location.origin + "/" + preparedPath,
        //   displayText: path
        // }
        let obj1 = breadcrumbJson[BreadCrumbMappingEnum.DASHBOARD];
        obj1.hrefLink = window.location.origin + "/" + preparedPath;
        this.routeUrlSegments.push(obj1);
      })
      console.log(this.routeUrlSegments);
      // if (currentPath == "/dashboard") {
      //   this.isDashboard = true;
      //   this.mainHeaderText = "DASHBOARD";
      // } else if (currentPath == "/dashboard/create-ride") {
      //   this.isDashboard = false;
      //   this.mainHeaderText = "RIDES";
      // }
    });
  }

  ngOnInit(): void {
  }

}

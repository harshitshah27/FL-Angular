import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isCreatingRideInProgress = false;
  mainHeaderText = "";
  isDashboard = true;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    // console.log(this.route);
    this.route.url.subscribe(params => {
      let currentPath = this.router.url;
      if (currentPath == "/user/dashboard") {
        this.isDashboard = true;
        this.mainHeaderText = "DASHBOARD";
      } else {
        this.isDashboard = false;
      }
      // do something
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log(this.route);
    this.route.url.subscribe(params => {
      console.log(params);
      // do something
    });
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-card',
  templateUrl: './total-card.component.html',
  styleUrls: ['./total-card.component.scss']
})
export class TotalCardComponent implements OnInit {

  @Input() icon: string | undefined;
  @Input() text: string | undefined;
  @Input() value: number | undefined;
  @Input() filterId: number | undefined;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    if (this.filterId !== null || this.filterId !== undefined) {
      this.router.navigateByUrl(`/interactions?filter=${this.filterId}`)
    }
  }
}

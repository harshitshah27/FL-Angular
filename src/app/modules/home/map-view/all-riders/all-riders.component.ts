import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-all-riders',
  templateUrl: './all-riders.component.html',
  styleUrls: ['./all-riders.component.scss']
})
export class AllRidersComponent implements OnInit {

  @Input() allRidersData: any[] = [];
  @Output() closeAllRiders = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeAllRidersList() {
    this.closeAllRiders.emit(true);
  }

}

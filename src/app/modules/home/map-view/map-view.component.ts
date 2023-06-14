import { Component, OnInit } from '@angular/core';

export interface RideObject {
  id?: number;
  name?: string;
  ridersCount?: number;
  bus?: BusInfo[];
}

export interface BusInfo {
  id?: number;
  name?: string;
  busNumber?: string;
  viewDetails?: boolean;
}

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  opened: boolean = true;
  rideObject: RideObject = {};
  busDetails: BusInfo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.rideObject.name = "Ride 1";
    this.rideObject.ridersCount = 50;
    this.busDetails = [
      {
        id: 1,
        name: "B1",
        busNumber: "MH02V5655",
        viewDetails: false
      },
      {
        id: 2,
        name: "B2",
        busNumber: "MH02V5111",
        viewDetails: false
      },
      {
        id: 3,
        name: "B3",
        busNumber: "MH02V5000",
        viewDetails: false
      },
    ];
    this.rideObject.bus = this.busDetails;
  }

  viewBusDetails(event: Event) {
    console.log(event)
  }

}

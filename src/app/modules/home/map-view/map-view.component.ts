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
  gMapLink: string;
  stops?: BusStopsWithRiders[];
}

export interface BusStopsWithRiders {
  stopName?: string;
  stopLocation?: string;
  ridersCount?: number;
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
  viewAllRiders: boolean = false;
  allRidersData: any[] = [
    { id: 1, name: "ABC" },
    { id: 1, name: "ABCA BCA BCABCAB CABCABCABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },
    { id: 1, name: "ABC" },

  ];

  constructor() { }

  ngOnInit(): void {
    this.rideObject.name = "Ride 1";
    this.rideObject.ridersCount = 50;
    this.busDetails = [
      {
        id: 1,
        name: "B1",
        busNumber: "MH02V5655",
        viewDetails: false,
        gMapLink: "goo.gl/maps/rFcsa1234v1",
        stops: [
          {
            stopName: "A",
            stopLocation: "aaa",
            ridersCount: 5
          },
          {
            stopName: "AA",
            stopLocation: "aaa",
            ridersCount: 15
          },
        ]
      },
      {
        id: 2,
        name: "B2",
        busNumber: "MH02V5111",
        viewDetails: false,
        gMapLink: "goo.gl/maps/rFcsa1234v1",
        stops: [
          {
            stopName: "B",
            stopLocation: "bbb",
            ridersCount: 5
          },
          {
            stopName: "BB",
            stopLocation: "bbbb",
            ridersCount: 15
          },
        ]
      },
      {
        id: 3,
        name: "B3",
        busNumber: "MH02V5000",
        viewDetails: false,
        gMapLink: "goo.gl/maps/rFcsa1234v1",
        stops: [
          {
            stopName: "C",
            stopLocation: "ccc",
            ridersCount: 5
          },
          {
            stopName: "CC",
            stopLocation: "cc",
            ridersCount: 15
          },
        ]
      },
    ];
    this.rideObject.bus = this.busDetails;
  }

  viewBusDetails(event: Event) {
    console.log(event)
  }

  toggleViewAllRiders() {
    this.viewAllRiders = !this.viewAllRiders;
  }

}

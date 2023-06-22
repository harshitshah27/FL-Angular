import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

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
export class MapViewComponent implements OnInit, AfterViewInit {

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
  allBusViewDetails: boolean = false;
  mapOptions: google.maps.MapOptions = {};
  markers: any;
  marker: any;

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor() { }

  ngAfterViewInit() {
    const bounds = this.getBounds(this.markers);
    this.map?.googleMap?.fitBounds(bounds);
  }

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
          {
            stopName: "AAA",
            stopLocation: "aaa 00",
            ridersCount: 10
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
    this.mapOptions = {
      center: { lat: 38.9987208, lng: -77.2538699 },
      // zoom: 14,
      // disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    };
    // this.marker = {
    //   position: { lat: 38.9987208, lng: -77.2538699 },
    // };
    this.markers = [
      {
        position: { lat: 34.397, lng: -72.644 },
        title: "AA"
      },
      {
        position: { lat: 39.9987208, lng: -71.2538699 },
        title: "BB"
      },
      {
        position: { lat: 34.9987208, lng: -70.2538699 },
        title: "CC",
        snippet: "xxxx"
      },
    ];
  }

  viewBusDetails(viewAllBusDetails: boolean) {
    if (viewAllBusDetails) {
      this.busDetails.forEach((bus) => bus.viewDetails = this.allBusViewDetails);
    }
  }

  toggleViewAllRiders() {
    this.viewAllRiders = !this.viewAllRiders;
  }

  getBounds(markers: any) {
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers) {
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }

}

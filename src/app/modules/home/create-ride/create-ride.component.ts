
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface RiderObject {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: number;
}

export interface RideObject {
  name?: string;
  startPoint?: string;
  destinationPoint?: string;
  selectedDate?: string;
  selectedTime?: string;
  roundTripStartPoint?: string;
  roundTripDestinationPoint?: string;
  roundTripSelectedDate?: string;
  roundTripSelectedTime?: string;
  riders?: RiderObject[];
  noOfBuses?: string;
  busCapacity?: number;
}
@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.scss'],
})
export class CreateRideComponent implements OnInit, AfterViewInit {

  options: string[] = ["a", "b"];
  pickupControl = new FormControl();
  destControl = new FormControl();
  roundTripPickupControl = new FormControl();
  roundTripDestControl = new FormControl();
  radioSelection = new FormControl();
  pickupRoundtripToggleValue: boolean = false;

  displayedColumns: String[] = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zip'];

  dataSource = new MatTableDataSource<RiderObject>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild("table") table: any;

  dataObject: RideObject = {};

  ridersArray: RiderObject[] = [];
  radioColor: ThemePalette = "primary";

  selectedTime: string = "";
  selectedDate: Date = new Date();

  isPreview: boolean = false;

  constructor(public router: Router,) { }

  ngOnInit(): void {
    this.radioSelection.setValue('1');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  saveAsDraftAction(): void {
    this.dataObject.startPoint = this.pickupControl.value;
    this.dataObject.destinationPoint = this.destControl.value;
    this.dataObject.roundTripStartPoint = this.roundTripPickupControl.value;
    this.dataObject.roundTripDestinationPoint = this.roundTripDestControl.value;
    this.dataObject.riders = this.dataSource.data;
    console.log(this.dataObject);
  }

  createNewRide(): void {

  }

  addNewRider() {
    this.ridersArray.push({
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: 1111
    });
    this.dataSource = new MatTableDataSource(this.ridersArray);
  }

  togglePickupRoundTripDetails(event: any) {
    this.pickupRoundtripToggleValue = event.source.checked;
  }

  showPreview() {
    this.isPreview = !this.isPreview;
  }

}

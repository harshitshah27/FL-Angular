import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// Define the date format
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
  riders?: RiderObject[];
  noOfBuses?: string;
  busCapacity?: number;
}
@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.scss'],
  // providers: [
  //   // Use Moment.js adapter and define the date formats
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  //   { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  // ],
})
export class CreateRideComponent implements OnInit, AfterViewInit {

  options: string[] = ["a", "b"];
  pickupControl = new FormControl();
  destControl = new FormControl();
  radioSelection = new FormControl();

  displayedColumns: String[] = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zip'];

  dataSource = new MatTableDataSource<RiderObject>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild("table") table: any;

  dataObject: RideObject = {};

  ridersArray: RiderObject[] = [];
  radioColor: ThemePalette = "primary";

  selectedTime: string = "";
  selectedDate: Date = new Date();

  constructor(public router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.radioSelection.setValue('1');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  saveAsDraftAction(): void {
    this.dataObject.startPoint = this.pickupControl.value;
    this.dataObject.destinationPoint = this.destControl.value;
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

}

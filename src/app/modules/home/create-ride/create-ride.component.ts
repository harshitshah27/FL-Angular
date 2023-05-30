import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  styleUrls: ['./create-ride.component.scss']
})
export class CreateRideComponent implements OnInit, AfterViewInit {

  options: string[] = ["a", "b"];
  pickupControl = new FormControl();
  destControl = new FormControl();

  displayedColumns: String[] = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zip'];

  dataSource = new MatTableDataSource<RiderObject>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild("table") table: any;

  dataObject: RideObject = {};

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

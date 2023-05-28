import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RideObject {
  name: string;
  noOfRiders: number;
  noOfBuses: number;
  details: string;
}

const ELEMENT_DATA: RideObject[] = [
  { noOfRiders: 1, name: 'Hydrogen', noOfBuses: 1.0079, details: 'H' },
  { noOfRiders: 2, name: 'Helium', noOfBuses: 4.0026, details: 'He' },
  { noOfRiders: 3, name: 'Lithium', noOfBuses: 6.941, details: 'Li' },
  { noOfRiders: 4, name: 'Beryllium', noOfBuses: 9.0122, details: 'Be' },
  { noOfRiders: 5, name: 'Boron', noOfBuses: 10.811, details: 'B' },
  { noOfRiders: 6, name: 'Carbon', noOfBuses: 12.0107, details: 'C' },
  { noOfRiders: 7, name: 'Nitrogen', noOfBuses: 14.0067, details: 'N' },
  { noOfRiders: 8, name: 'Oxygen', noOfBuses: 15.9994, details: 'O' },
  { noOfRiders: 9, name: 'Fluorine', noOfBuses: 18.9984, details: 'F' },
  { noOfRiders: 10, name: 'Neon', noOfBuses: 20.1797, details: 'Ne' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: String[] = [];
  searchTerm = "";
  status = new FormControl('');

  statusOptionList = [
    {
      id: 1,
      value: 'Completed'
    }, {
      id: 2,
      value: 'Draft'
    },
    {
      id: 3,
      value: 'On going'
    }
  ];
  
  dataSource = new MatTableDataSource<RideObject>();

  @ViewChild(MatSort) sort = new MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("table") table: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedColumns = ['rideName', 'noOfBuses', 'noOfRiders', 'details', 'status', 'action'];
    // this.dataSource = ELEMENT_DATA;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.dialog.open(CommonDialogComponent);
  }

}

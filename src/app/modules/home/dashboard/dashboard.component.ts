import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RideObject {
  name: string;
  noOfRiders: number;
  noOfBuses: number;
  details: string;
  status: number;
}

const ELEMENT_DATA: RideObject[] = [
  { status:1, noOfRiders: 1, name: 'Hydrogen', noOfBuses: 1.0079, details: 'H' },
  { status:2, noOfRiders: 2, name: 'Helium', noOfBuses: 4.0026, details: 'He' },
  { status:3, noOfRiders: 3, name: 'Lithium', noOfBuses: 6.941, details: 'Li' },
  { status:1, noOfRiders: 4, name: 'Beryllium', noOfBuses: 9.0122, details: 'Be' },
  { status:3, noOfRiders: 5, name: 'Boron', noOfBuses: 10.811, details: 'B' },
  { status:1, noOfRiders: 6, name: 'Carbon', noOfBuses: 12.0107, details: 'C' },
  { status:2, noOfRiders: 7, name: 'Nitrogen', noOfBuses: 14.0067, details: 'N' },
  { status:1, noOfRiders: 8, name: 'Oxygen', noOfBuses: 15.9994, details: 'O' },
  { status:1, noOfRiders: 9, name: 'Fluorine', noOfBuses: 18.9984, details: 'F' },
  { status:2, noOfRiders: 10, name: 'Neon', noOfBuses: 20.1797, details: 'Ne' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: String[] = ['rideName', 'noOfBuses', 'noOfRiders', 'details', 'status', 'action'];
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
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild("table") table: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<RideObject> (ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    let dialogRef = this.dialog.open(CommonDialogComponent, {
      panelClass:"confirmation-dialog",
      data: {
        title: "Confrmation",
        description: "ABCD",
        buttons: [
          {
            text: "Cancel",
            className: "cancel-btn"
          },
          {
            text: "Save",
            className: "save-btn"
          }
        ]
      }
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

}

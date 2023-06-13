import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface RideObject {
  name: string;
  noOfRiders: number;
  noOfBuses: number;
  status: number;
}

enum RideStatus {
  PROCESSING = "Processing",
  COMPLETED = "Completed",
  ARCHIEVED = "Archieved",
  DRAFTED = "Drafted"
}

enum ActionType {
  DUPLICATE = 1,
  DELETE = 2,
  ARCHIEVE = 3
}

const ELEMENT_DATA: RideObject[] = [
  { status: 1, noOfRiders: 1, name: 'Hydrogen', noOfBuses: 1.0079 },
  { status: 2, noOfRiders: 2, name: 'Helium', noOfBuses: 4.0026 },
  { status: 3, noOfRiders: 3, name: 'Lithium', noOfBuses: 6.941 },
  { status: 1, noOfRiders: 4, name: 'Beryllium', noOfBuses: 9.0122 },
  { status: 3, noOfRiders: 5, name: 'Boron', noOfBuses: 10.811 },
  { status: 1, noOfRiders: 6, name: 'Carbon', noOfBuses: 12.0107 },
  { status: 2, noOfRiders: 7, name: 'Nitrogen', noOfBuses: 14.0067 },
  { status: 4, noOfRiders: 8, name: 'Oxygen', noOfBuses: 15.9994 },
  { status: 4, noOfRiders: 9, name: 'Fluorine', noOfBuses: 18.9984 },
  { status: 2, noOfRiders: 10, name: 'Neon', noOfBuses: 20.1797 },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  RideStatus = RideStatus;
  displayedColumns: String[] = ['arrow', 'rideName', 'noOfBuses', 'noOfRiders', 'status', 'action'];
  searchTerm = "";
  status = new FormControl('');
  isCreatingRideInProgress = false;
  statusOptionList = [
    {
      id: 1,
      value: RideStatus.PROCESSING
    },
    {
      id: 2,
      value: RideStatus.COMPLETED
    },
    {
      id: 3,
      value: RideStatus.ARCHIEVED
    },
    {
      id: 4,
      value: RideStatus.DRAFTED
    }
  ];

  rideProgressValue: number = 75;

  dataSource = new MatTableDataSource<RideObject>();

  @ViewChild(MatSort) sort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild("table") table: any;

  constructor(private dialog: MatDialog,
    public router: Router,
    private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<RideObject>(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(item: RideObject, action: ActionType) {
    let dialogConfig = {};
    let buttonsArray = [
      {
        text: "Cancel",
        className: "cancel-btn"
      },
      {
        text: "Yes",
        className: "primary-btn"
      }
    ];
    switch (action) {
      case 1:
        dialogConfig = {
          panelClass: "confirmation-dialog",
          data: {
            title: "Confirmation",
            description: "Are you sure you want to Duplicate " + item.name + " ?",
            buttons: buttonsArray
          }
        }
        break;

      case 2:
        dialogConfig = {
          panelClass: "confirmation-dialog",
          data: {
            title: "Confirmation",
            description: "Are you sure you want to Delete " + item.name + " ?",
            buttons: buttonsArray
          }
        }
        break;

      case 3:
        dialogConfig = {
          panelClass: "confirmation-dialog",
          data: {
            title: "Confirmation",
            description: "Are you sure you want to Archieve " + item.name + " ?",
            buttons: buttonsArray
          }
        }
        break;
    }
    let dialogRef = this.dialog.open(CommonDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => { });
  }

  resetFilters() {
    this.searchTerm = '';
    this.status.setValue('');
  }

  applyFilter() {
    // setTimeout(() => {
    this.dataSource.filter = JSON.stringify({ a: this.searchTerm, b: this.status.value });
    this.dataSource.filterPredicate = (data, filter) => {
      const searchInput = JSON.parse(filter).a;
      const selectedStatus = JSON.parse(filter).b;

      const matchesSearch = data.name.toLowerCase().includes(searchInput);
      const matchesStatus = Number(selectedStatus) > 0 ? data.status === selectedStatus : true;

      return matchesSearch && matchesStatus;
    };
    this.dataSource.filter = JSON.stringify({ a: this.searchTerm, b: this.status.value });
    // }, 0);
  }

  openSnackBar() {
    const config = {
      barColor: "success",
      iconName: "check_circle",
      message: "Ride created successfully"
    }
    this.snackBarService.openSnackBar(config);
  }

}

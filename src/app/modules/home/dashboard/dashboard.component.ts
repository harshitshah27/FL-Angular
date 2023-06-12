import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../shared/components/common-dialog/common-dialog.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMsgComponent } from '../../shared/components/snackbar-msg/snackbar-msg.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface RideObject {
  rideId: number;
  name: string;
  noOfRiders: number;
  noOfBuses: number;
  status: number;
}

enum ActionType {
  DUPLICATE = 1,
  DELETE = 2,
  ARCHIEVE = 3
}

const ELEMENT_DATA: RideObject[] = [
  { rideId: 1, status: 1, noOfRiders: 1, name: 'Hydrogen', noOfBuses: 1.0079 },
  { rideId: 2, status: 2, noOfRiders: 2, name: 'Helium', noOfBuses: 4.0026 },
  { rideId: 3, status: 3, noOfRiders: 3, name: 'Lithium', noOfBuses: 6.941 },
  { rideId: 4, status: 1, noOfRiders: 4, name: 'Beryllium', noOfBuses: 9.0122 },
  { rideId: 5, status: 3, noOfRiders: 5, name: 'Boron', noOfBuses: 10.811 },
  { rideId: 6, status: 1, noOfRiders: 6, name: 'Carbon', noOfBuses: 12.0107 },
  { rideId: 7, status: 2, noOfRiders: 7, name: 'Nitrogen', noOfBuses: 14.0067 },
  { rideId: 8, status: 1, noOfRiders: 8, name: 'Oxygen', noOfBuses: 15.9994 },
  { rideId: 9, status: 1, noOfRiders: 9, name: 'Fluorine', noOfBuses: 18.9984 },
  { rideId: 10, status: 2, noOfRiders: 10, name: 'Neon', noOfBuses: 20.1797 },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: String[] = ['arrow', 'rideName', 'noOfBuses', 'noOfRiders', 'status', 'action'];
  searchTerm = "";
  status = new FormControl('');
  isCreatingRideInProgress = false;
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
    this.filterByStatus('');
    this.applySearchFilter();
  }

  filterByStatus(filterValue: any) {
    this.dataSource.filterPredicate = (data: RideObject, filter: string) => {
      return data.status == filterValue;
    };
    this.dataSource.filter = filterValue.toString();
  }

  applySearchFilter(event?: Event) {
    const filterValue = event ? (event.target as HTMLInputElement).value : '';
    console.log("filtervalue => " + filterValue);
    this.dataSource.filterPredicate = (data: RideObject, filterValue: string) => {
      return data.name == filterValue;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar() {
    const config = {
      barColor: "success",
      iconName: "check_circle",
      message: "Ride created successfully"
    }
    this.snackBarService.openSnackBar(config);
  }

  openRideMap(rideObj: RideObject) {
    this.router.navigate(['/dashboard/map'], { queryParams: { order: rideObj.rideId } });
  }

}

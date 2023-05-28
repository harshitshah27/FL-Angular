import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InteractionStatus } from 'src/app/enums/interaction-status';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConclusionScreenComponent } from './../conclusion-screen/conclusion-screen.component';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { ActivatedRoute, Router } from '@angular/router';
import { UserConfirmationDialogComponent } from '../../../shared/components/user-confirmation-dialog/user-confirmation-dialog.component';
import { InteractionListRerenderService } from '../../../../services/interaction-list-rerender.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-interaction-list',
  templateUrl: './interaction-list.component.html',
  styleUrls: ['./interaction-list.component.scss']
})
export class InteractionListComponent implements OnInit {
  currentUser: any;
  isAdmin: boolean = false;
  interactions: any[] = []
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: any = new Subject();
  // dtTriggerForAdmin: any = new Subject();
  dtOptions: any = {
    pagingType: 'numbers',
    pageLength: 10,
    serverSide: true,
    processing: false,
    searching: true,
    lengthChange: false,
    ajax: (dataTablesParameters: any, callback: any) => {
      this.getListApiFunction(dataTablesParameters, callback);
    },
    columns: [{

    }]
  }
  // dtOptionsForAdmin!: DataTables.Settings;
  customFilter = {
    // role: "Agent"
  }
  transScript: any[] = []

  selectedFilter: InteractionStatus = InteractionStatus.ALL;

  filterExpanded: boolean = true;
  agentList: any[] = [{ value: null, text: 'None' }];
  selectedAgent: any = null;
  selectedTime: number = -1;
  selectedSupportedQuery: any = null;

  timeFilterList: any[] = [
    { start: 0, end: 24 }, { start: 24, end: 48 }, { start: 48, end: 72 }, { start: 72 }
  ];

  keyPressed: any[] = []

  recentActivity: any[] = []
  totalRecentActivity: number = 50;
  recentActivityPageNumber: number = 1;
  recentActivityPageSize: number = 10;

  constructor(
    private apiCallService: ApiCallService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private interactionListRerenderService: InteractionListRerenderService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    dayjs.extend(relativeTime)
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Alt') {
      this.keyPressed = []
      this.keyPressed.push('Alt')
    } else {
      if (this.keyPressed && this.keyPressed.length == 1 && this.keyPressed[0] === 'Alt') {
        switch (event.key) {
          case 'a':
            this.selectedFilter = 0;
            this.selectionFilterChange(event)
            break;
          case 'n':
            this.selectedFilter = 1;
            this.selectionFilterChange(event)
            break;
          case 'o':
            this.selectedFilter = 2;
            this.selectionFilterChange(event)
            break;
          case 'p':
            this.selectedFilter = 3;
            this.selectionFilterChange(event)
            break;
          case 's':
            this.selectedFilter = 4;
            this.selectionFilterChange(event)
            break;
          default:
            break;
        }
        this.keyPressed = []
      }
    }
  }

  ngOnInit(): void {
    this.getRecentActivity();
    this.route.queryParams.subscribe((params) => {
      this.authService.currentLoggedInUser$.subscribe((loggedInUser) => {
        if (loggedInUser) {
          this.currentUser = loggedInUser;
          this.isAdmin = this.currentUser && this.currentUser.role !== 'Agent' ? true : false;
          if (this.isAdmin) {
            this.apiCallService.sendGetRequest('user', {}, true).then((res: any) => {
              this.agentList = res.data.filter((user: any) => user.role === 'Agent')
                .map((user: any) => { return { text: user.name, value: user._id } });
            })
          }
          if (params['filter']) {
            this.selectedFilter = parseInt(params['filter']);
          }
          this.customFilter = this.getCustomFilter();
          this.dtOptions.columns = [...this.getTableColumns()];
          this.dtOptions.order = [[this.dtOptions.columns.findIndex((res: any) => res.data == 'updatedAt'), 'desc']];
          // this.dtOptions.dom = 'Bfrtip';
          // this.dtOptions.buttons = ['excel'];
          this.rerender();
        }
      });
    })
    this.interactionListRerenderService.getRerender().subscribe(() => {
      // console.log('subscribe');
      this.rerender();
      this.recentActivityPageNumber = 1;
      this.recentActivity = [];
      this.getRecentActivity();
      // console.log('subscribe');
    })
  }

  getRecentActivity() {
    const payload = {
      pageNumber: this.recentActivityPageNumber,
      pageSize: this.recentActivityPageSize
    }
    this.apiCallService.sendGetRequest('activity/get-activities', payload, true).then((res: any) => {
      // console.log(res);
      if (res.data.activityCount) {
        this.totalRecentActivity = res.data.activityCount
      }
      if (this.recentActivity.length > 0) {
        this.recentActivity = [...this.recentActivity, ...res.data.activites]
      } else {
        this.recentActivity = res.data.activites
      }
      // console.log(this.recentActivity);
    })
  }

  addedRecentActivity() {
    setTimeout(() => {
      this.getRecentActivity()
    }, 500)
  }

  onScroll() {
    if (this.recentActivityPageNumber * this.recentActivityPageSize < this.totalRecentActivity) {
      this.recentActivityPageNumber += 1;
      this.addedRecentActivity();
    }
  }

  getListApiFunction = (dataTablesParameters: any, callback: any) => {
    this.apiCallService.sendGetRequest('interaction', { ...dataTablesParameters, keep: '_id userID status', format: 'datatables', customFilter: this.customFilter }).then((resp: any) => {
      this.interactions = resp.data.data;
      callback({
        recordsTotal: resp.data.recordsFiltered,
        recordsFiltered: resp.data.recordsFiltered,
        data: []
      });
    });
  }

  getTableColumns() {
    if (this.isAdmin) {
      return [
        { data: 'interactionId', name: 'Interaction ID', searchable: true, width: '9rem' },
        { data: 'customerName', name: 'Agent', searchable: false },
        { data: 'userID', name: 'Client', searchable: false },
        { data: 'userID', name: 'Client', searchable: false },
        { data: 'contactNo', name: 'Contact', searchable: true },
        { data: 'updatedAt', name: 'Date', searchable: false },
        { data: 'createdAt', name: 'Date', searchable: false },
        // { data: '_id', name: 'Action', searchable: false, orderable: false }
      ]
    } else {
      return [
        { data: 'interactionId', searchable: true, width: '9rem' },
        { data: 'customerName', searchable: false },
        { data: 'contactNo', searchable: true },
        { data: 'updatedAt', searchable: false },
        { data: 'createdAt', name: 'Date', searchable: false },
        // { data: '_id', searchable: false, orderable: false }
      ]
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  // this.dtTriggerForAdmin.next(this.dtOptionsForAdmin);

  rerender(): void {
    if (!this.dtElement) {
      setTimeout(() => {
        this.rerender()
      }, 1000);
    } else {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(this.dtOptions);
      });
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    // this.authService.currentLoggedInUser$.unsubscribe();
  }

  viewInteractionsDetails(id: any) {
    const dialogRef = this.dialog.open(ConclusionScreenComponent,
      {
        disableClose: false,
        autoFocus: true,
        data: {
          interactionId: id
        },
        panelClass: 'conclusion-screen-dialog',
        width: '80vw'
      });
    dialogRef.afterClosed().subscribe(result => {
      // this.rerender();
    });
  }

  getStatus(status: any) {
    if (status == 1) {
      return 'New'
    } else if (status === 2) {
      return 'Open'
    } else if (status === 3) {
      return 'Pending'
    } else if (status === 4) {
      return 'Solved'
    }
    return 'NAN'
  }

  selectionFilterChange(e: any) {
    this.location.go(`/interactions?filter=${this.selectedFilter}`);
    if (this.selectedFilter === InteractionStatus.ALL || this.selectedFilter === InteractionStatus.NEW) {
      this.resetFilter();
    } else {
      this.customFilter = this.getCustomFilter();
      this.rerender();
    }
  }

  redirectToInteraction(item: any) {
    if (item?.status === InteractionStatus.NEW && !this.isAdmin) {
      const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
        data: {
          title: '',
          content: `Are you sure you want to accept interaction #${item?.interactionId}? This action cannot be undone.`,
          footerButtons: [
            {
              response: {
                id: 'cancel',
              },
              text: 'Cancel'
            },
            {
              response: {
                id: 'yes',
              },
              text: 'Proceed'
            }
          ]
        },
        disableClose: false,
        panelClass: 'user-confirmation-component',
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((response: any) => {
        if (response.id === 'yes') {
          this.apiCallService.sendPatchRequest(`interaction/change-interaction-status`, {
            interactionId: item._id,
            status: InteractionStatus.OPEN
          }).then((res: any) => {
            this.snackBar.open("Interaction status changed.", 'Dismiss', {
              duration: 2000
            })
            this.router.navigate([`interactions/${item.interactionId}`])
          })
        }
      });
    } else {
      this.router.navigate([`interactions/${item.interactionId}`])
    }
  }

  getCustomFilter() {
    this.customFilter = {}
    let customFilter = {}
    if (!this.isAdmin) {
      customFilter = { ...this.customFilter, userID: this.currentUser._id }
    }
    if (this.selectedFilter === InteractionStatus.ALL) {
      if (this.isAdmin) {
        customFilter = {}
      } else {
        customFilter = {status: {$in: [InteractionStatus.NEW, InteractionStatus.OPEN, InteractionStatus.PENDING, InteractionStatus.SOLVED]}}        
      }
    } else if (this.selectedFilter === InteractionStatus.NEW) {
      customFilter = { status: InteractionStatus.NEW }
    } else {
      customFilter = { ...customFilter, status: this.selectedFilter }
    }
    if (this.selectedAgent) {
      customFilter = { ...customFilter, userID: this.selectedAgent };
    }
    if (this.selectedSupportedQuery) {
      customFilter = { ...customFilter, updatedAt: this.getDateFilters(this.selectedSupportedQuery) }
    }
    return customFilter;
  }

  isDateLessThan24Hours(date: Date) {
    const diff = dayjs(new Date()).diff(date, 'hours', true);
    return diff <= 24;
  }

  isDateBetweenTIme(date: Date, start: number, end: number) {
    const diff = dayjs(new Date()).diff(date, 'hours', true);
    return start <= diff && diff <= end;
  }

  getFormattedDate(date: any) {
    if (this.isDateLessThan24Hours(date)) {
      return dayjs(date).fromNow()
    } else if (this.isDateBetweenTIme(date, 24, 48)) {
      return `Yesterday, ${dayjs(date).format('hh:mm a')}`
    } else if (this.isDateBetweenTIme(date, 48, 144)) {
      return `${dayjs(date).format('ddd')}, ${dayjs(date).format('hh:mm a')}`
    }
    return dayjs(date).format('DD MMM YYYY');
  }

  expanded() {
    this.filterExpanded = !this.filterExpanded;
    // this.rerender();
  }

  filterByAgent() {
    this.customFilter = { ...this.customFilter, userID: this.selectedAgent };
    this.rerender();
  }

  applyTimeFilter(time: any) {
    this.selectedSupportedQuery = time;
    this.selectedTime = time.start;
    this.customFilter = { ...this.customFilter, updatedAt: this.getDateFilters(time) }
    this.rerender();
  }

  getDateFilters(time: any) {
    if (!time.end) {
      return {
        $lt: dayjs().subtract(time.start, 'hours').format()
      }
    }
    return {
      $gte: dayjs().subtract(time.end, 'hours').format(),
      $lt: dayjs().subtract(time.start, 'hours').format()
    }
  }

  downloadExcel() {
    console.log('click');
    
    const dialogRef = this.dialog.open(UserConfirmationDialogComponent, {
      data: {
        title: '',
        content: `Are you sure you want to download the interactions listed in the table?`,
        footerButtons: [
          {
            response: {
              id: 'cancel',
            },
            text: 'Cancel'
          },
          {
            response: {
              id: 'yes',
            },
            text: 'Proceed'
          }
        ]
      },
      disableClose: false,
      panelClass: 'user-confirmation-component',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response.id === 'yes') {
        if (this.interactions && this.interactions.length) {
          const payload: any = {
            status: this.selectedFilter,
          }
          if (this.selectedAgent) {
            payload.userID = this.selectedAgent
          }
          if (!this.isAdmin) {
            payload.userID = this.currentUser._id;
          }
          if (this.selectedSupportedQuery) {
            if (this.selectedSupportedQuery.start !== null) {
              payload.endDate = dayjs().subtract(this.selectedSupportedQuery.start, 'hours').format()
            }
            if (this.selectedSupportedQuery.end) {
              payload.startDate = dayjs().subtract(this.selectedSupportedQuery.end, 'hours').format()
            }
          }
          // console.log(payload);
          this.apiCallService.sendPostRequest('interaction/download', payload, true).then((res: any) => {
            this.snackBar.open("Your file is being downloaded. Please check the Downloads page after a while.", 'Dismiss', {
              duration: 2000
            })
          })
        } else {
          this.snackBar.open("No Record found.", 'Dismiss', {
            duration: 2000
          })
        }
      }
    })
  }

  resetFilter() {
    this.selectedSupportedQuery = null;
    this.selectedAgent = null;
    this.selectedTime = -1;
    this.customFilter = this.getCustomFilter();
    this.rerender();
  }
}

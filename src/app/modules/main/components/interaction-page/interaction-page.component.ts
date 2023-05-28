import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConclusionScreenComponent } from '../conclusion-screen/conclusion-screen.component';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { ApiCallService } from './../../../../services/api-call.service';

@Component({
  selector: 'app-interaction-page',
  templateUrl: './interaction-page.component.html',
  styleUrls: ['./interaction-page.component.scss']
})
export class InteractionPageComponent implements OnInit {
  interactionId: string = '1233456';
  transScript: any[] = []

  filterExpanded: boolean = true;
  recentActivity: any[] = []
  totalRecentActivity: number = 50;
  recentActivityPageNumber: number = 1;
  recentActivityPageSize: number = 10;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private apiCallService: ApiCallService,
  ) {
    dayjs.extend(relativeTime)
  }

  ngOnInit(): void {
    this.getRecentActivity();
    this.route.params.subscribe((params) => {
      this.interactionId = params['id'];
    })
  }

  reUpload(event: any) {
    const dialogRef = this.dialog.open(ConclusionScreenComponent,
      {
        disableClose: false,
        autoFocus: true,
        data: {
          transScript: this.transScript,
          interactionId: this.interactionId
        },
        panelClass: 'conclusion-screen-dialog',
        width: '80vw'
      });
    dialogRef.afterClosed().subscribe(result => {
      // this.rerender();
    });
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
      return `${dayjs(date).format('dddd')}, ${dayjs(date).format('hh:mm a')}`
    }
    return dayjs(date).format('DD MMM YYYY');
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
    })
  }

  addedRecentActivity() {
    setTimeout(() => {
      this.getRecentActivity()
    }, 500)
  }

  expanded() {
    this.filterExpanded = !this.filterExpanded;
    // this.rerender();
  }

  onScroll() {
    if (this.recentActivityPageNumber * this.recentActivityPageSize < this.totalRecentActivity) {
      this.recentActivityPageNumber += 1;
      this.addedRecentActivity();
    }
  }
}

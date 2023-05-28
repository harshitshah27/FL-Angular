import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as Highcharts from 'highcharts';
import { ApiCallService } from './../../../../services/api-call.service';
import { Subject } from 'rxjs';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  agentActivityList: any[] = []

  leaderBoardList: any[] = [
  ]

  chartOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      width: 260,
      height: 260
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        fontFamily: 'Montserrat'
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        borderWidth: 0,
        innerSize: '40%'
      }
    },
    series: [
      {
        name: 'stats',
        colorByPoint: true,
        type: 'pie',
        size: 200,
        data: [{
          name: 'Upgrade Closed',
          y: 10,
          color: '#2130B8'
        },
        {
          name: 'Upgrade Pending',
          y: 5,
          color: '#21B731'
        }]
      }],
    credits: {
      enabled: false
    }
  };

  barChartOptions: any = {
    chart: {
      type: 'column',
      height: 260
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [],
      lineWidth: 0,
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: {
        text: null
      },
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        pointWidth: 20,
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Interactions Closed',
        data: [],
        color: '#F0F0F0'
      },
      {
        name: 'Interactions Received',
        data: [],
        color: '#2130B8'
      }
    ]
  };

  selectedBarChartType = 4

  barChartType = [
    { value: 1, viewValue: 'Annual' },
    { value: 2, viewValue: 'Month' },
    { value: 3, viewValue: 'Week' },
    { value: 4, viewValue: 'Daily' },
  ]

  views = ['Today', 'This week', 'This month', 'Last 3 months', 'Custom Date']

  annualColumns = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  dailyColumns: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  closedInteractions: number = 0
  pendingInteractions: number = 0
  totalInteractions: number = 0
  upgradedInteractions: number = 0
  openInteractions: number = 0
  newInteractions: number = 0
  selectedView = 'Today'
  interactionStatistics: any = {};

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiCallService: ApiCallService
  ) {
    dayjs.extend(relativeTime)
  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      searching: false,
      lengthChange: false,
      ordering: false,
    };

    // this.authService.currentLoggedInUser$.subscribe((loggedInUser) => {
    //   if (loggedInUser) {
    //     if (loggedInUser.role == 'Agent') {
    //       this.router.navigateByUrl('/interactions?filter=0');
    //     } else {
    //       this.getInteractionDetails();
    //       this.getRecentActivity();
    //     }
    //   }
    // })
  }

  onAttach() {
  }

  renderPieChart(closedInteractions: any, pendingInteractions: any) {
    if (closedInteractions !== null) {
      this.chartOptions.series[0].data[0].y = closedInteractions
    }
    if (pendingInteractions !== null) {
      this.chartOptions.series[0].data[1].y = pendingInteractions
    }
    setTimeout(() => {
      Highcharts.chart('pie-chart', this.chartOptions);
    }, 100)
  }

  getInteractionDetails(refreshAll = true) {
    const payload = { chartType: this.selectedBarChartType }
    this.apiCallService.sendGetRequest(`interaction/get-dashboard-data`, payload, true).then((result: any) => {
      const {
        closedInteractions,
        interactionStatistics,
        pendingInteractions,
        totalInteractions,
        topUsers,
        upgradedInteractions,
        newInteractions,
        openInteractions
      } = result.data
      if (refreshAll) {
        this.totalInteractions = totalInteractions;
        this.closedInteractions = closedInteractions;
        this.openInteractions = openInteractions;
        this.newInteractions = newInteractions;
        this.pendingInteractions = pendingInteractions;
        this.interactionStatistics = interactionStatistics;
        this.upgradedInteractions = upgradedInteractions;
        // this.leaderBoardList = [];
        topUsers.forEach((element: any, index: number) => {
          this.leaderBoardList.push(
            {
              id: index + 1,
              name: element.name,
              interactionCount: element.interactionCount,
              upgradeCount: element.closedInteractions,
              pendingCount: element.pendingInteractions
            }
          )
        });
        this.dtTrigger.next(this.dtOptions);
        this.renderPieChart(closedInteractions, pendingInteractions);
      }
      this.renderBarChart(interactionStatistics);
    })
  }


  renderBarChart(interactionStatistics: any) {
    if (interactionStatistics && interactionStatistics.chartData) {
      this.barChartOptions.series[0].data = interactionStatistics.chartData.closedInteractionList
      this.barChartOptions.series[1].data = interactionStatistics.chartData.totalInteractionList
    }
    let yearLabel: any[] = []
    switch (this.selectedBarChartType) {
      case 1:
        for (let i = interactionStatistics.chartData.closedInteractionList.length - 1; i >= 0; i--) {
          yearLabel.push(new Date().getFullYear() - i)
        }
        break;
      case 2:
        const currentMonth = new Date().getMonth() + 1
        yearLabel = [...this.annualColumns.slice(currentMonth), ...this.annualColumns.slice(0, currentMonth)];
        break;
      case 3:
        for (let i = 1; i <= interactionStatistics.chartData.closedInteractionList.length; i++) {
          yearLabel.push('Week ' + i)
        }
        break;
      case 4:
        const currentDay = new Date().getDay() + 1
        yearLabel = [...this.dailyColumns.slice(currentDay), ...this.dailyColumns.slice(0, currentDay)];
        break;
      default:
        break;
    }
    this.barChartOptions.xAxis.categories = yearLabel;
    Highcharts.chart('bar-chart', this.barChartOptions);
  }

  getRecentActivity() {
    const payload = {
      pageNumber: 1,
      pageSize: 3
    }
    this.apiCallService.sendGetRequest('activity/get-activities', payload, true).then((res: any) => {
      this.agentActivityList = res.data.activites
    })
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

  isDateLessThan24Hours(date: Date) {
    const diff = dayjs(new Date()).diff(date, 'hours', true);
    return diff <= 24;
  }

  changeValue(e: any) {
    this.getInteractionDetails(false);
  }

  changeView(view: any) {
    let startDate: any
    let endDate: any
    switch(view) {
      case 1:
        startDate = dayjs().startOf('day').format()
        endDate = dayjs().endOf('day').format()
        break;
      case 2:
        startDate = dayjs().startOf('week').format()
        endDate = dayjs().endOf('week').format()
        break;
      case 3:
        startDate = dayjs().startOf('month').format()
        endDate = dayjs().endOf('month').format()
        break;
      case 4:
        startDate = dayjs().subtract(2, 'month').startOf('month').format()
        endDate = dayjs().endOf('month').format()
        break;
      case 5:
        break;
    }
    console.log(startDate, endDate);
    
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    // this.authService.currentLoggedInUser$.unsubscribe();
  }
}

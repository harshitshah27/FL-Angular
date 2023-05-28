import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-settings-page',
  templateUrl: './admin-settings-page.component.html',
  styleUrls: ['./admin-settings-page.component.scss']
})
export class AdminSettingsPageComponent implements OnInit {

  agents: any = []
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<DataTables.Settings> = new Subject<DataTables.Settings>();
  dtOptions!: DataTables.Settings;
  customFilter = {
    role: "Admin"
  }

  constructor(
    private dialog: MatDialog,
    private apiCallService: ApiCallService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      searching: false,
      lengthChange: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.apiCallService.sendGetRequest('user', { ...dataTablesParameters, keep: '_id isInvited email mobileNumber', format: 'datatables', customFilter: this.customFilter }).then((resp: any) => {
          this.agents = resp.data.data;
          callback({
            recordsTotal: resp.data.recordsTotal,
            recordsFiltered: resp.data.recordsTotal,
            data: []
          });
        });
      },
      columns: [
        { data: 'name', searchable: false },
        { data: 'isActive', searchable: false },
        { data: 'lastLoginTime', searchable: false },
      ],
      order: [[0, 'asc']],
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  updateStatus(item: any) {
    const { _id, isActive } = item
    this.updateAgentUserDetails(_id, { isActive: !isActive })
  }

  updateAgentUserDetails(id: string, payload: any) {
    this.apiCallService.sendPatchRequest(`user/${id}`, payload).then((res) => {
      this.snackBar.open("User details updated.", 'Dismiss', {
        duration: 2000
      })
    })
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AddAgentsComponent } from '../add-agents/add-agents.component';
import { ViewAgentDetailsDialogComponent } from '../view-agent-details-dialog/view-agent-details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

enum AgentFilter {
  ALL = 1,
  Active = 2,
  Inactive = 3
}
@Component({
  selector: 'app-agent-maker',
  templateUrl: './agent-maker.component.html',
  styleUrls: ['./agent-maker.component.scss']
})
export class AgentMakerComponent implements OnInit {

  agents: any = []
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: any = new Subject();
  dtOptions!: DataTables.Settings;
  customFilter: any = {
    role: "Agent"
  }

  selectedAgentFilter: AgentFilter = AgentFilter.ALL;

  agentFilterData = AgentFilter;

  constructor(
    private dialog: MatDialog,
    private apiCallService: ApiCallService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      serverSide: true,
      processing: false,
      searching: false,
      lengthChange: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.apiCallService.sendGetRequest('user', { ...dataTablesParameters, keep: 'isInvited email mobileNumber', format: 'datatables', customFilter: this.customFilter }).then((resp: any) => {
          this.agents = resp.data.data;
          callback({
            recordsTotal: resp.data.recordsFiltered,
            recordsFiltered: resp.data.recordsFiltered,
            data: []
          });
        });
      },
      columns: [
        { data: 'userID', searchable: false },
        { data: 'name', searchable: false },
        { data: 'isActive', searchable: false },
        { data: 'lastLoginTime', searchable: false },
        { data: '_id', searchable: false, orderable: false },
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


  addAgent() {
    const dialogRef = this.dialog.open(AddAgentsComponent,
      {
        disableClose: true,
        autoFocus: true,
        data: {
          title: 'Add Agent',
          isEdit: false,
        },
        panelClass: 'add-edit-agents-dialog',
        width: 'min(45rem, 80vw)'
      });
    dialogRef.afterClosed().subscribe(result => {
      this.rerender();
    });
  }

  editAgent(selectedItem: any) {
    const dialogRef = this.dialog.open(AddAgentsComponent,
      {
        disableClose: true,
        autoFocus: true,
        data: {
          title: 'Edit Agent',
          isEdit: true,
          emailAddress: selectedItem.email,
          name: selectedItem.name,
          contactNumber: selectedItem.mobileNumber,
          isInvited: selectedItem.isInvited,
          id: selectedItem._id
        },
        panelClass: 'add-edit-agents-dialog',
        width: 'min(45rem, 80vw)'
      });
    dialogRef.afterClosed().subscribe(({ id, name, email, mobileNumber }) => {
      if (id) {
        this.updateAgentUserDetails(id, { name, email, mobileNumber });
      }
    });
  }

  viewAgent(selectedItem: any) {
    const dialogRef = this.dialog.open(ViewAgentDetailsDialogComponent,
      {
        disableClose: false,
        autoFocus: true,
        data: {
          emailAddress: selectedItem.email,
          name: selectedItem.name,
          contactNumber: selectedItem.mobileNumber,
          status: selectedItem.isActive,
          lastLogin: selectedItem.lastLoginTime,
        },
        panelClass: 'view-details-agents-dialog',
        width: 'min(40rem, 80vw)'
      });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  updateStatus(item: any) {
    const { _id, isActive } = item
    this.updateAgentUserDetails(_id, { isActive: !isActive })
  }

  sendInvite(selectedItem: any) {
    this.apiCallService.sendGetRequest(`user/send-invite/${selectedItem._id}`, {}, true).then((res) => {
      selectedItem.isInvited = true
      this.snackBar.open("Invite sent.", 'Dismiss', {
        duration: 2000
      })
    })
  }

  updateAgentUserDetails(id: string, payload: any) {
    this.apiCallService.sendPatchRequest(`user/${id}`, payload).then((res) => {
      this.rerender();
      this.snackBar.open("User details updated.", 'Dismiss', {
        duration: 2000
      })
    })
  }

  applyStatusFilter(status: number) {
    switch (status) {
      case AgentFilter.ALL:
        this.customFilter = {
          role: "Agent"
        }
        this.selectedAgentFilter = AgentFilter.ALL
        break;
      case AgentFilter.Active:
        this.customFilter = {
          role: "Agent",
          isActive: true
        }
        this.selectedAgentFilter = AgentFilter.Active
        break;
      case AgentFilter.Inactive:
        this.customFilter = {
          role: "Agent",
          isActive: false
        }
        this.selectedAgentFilter = AgentFilter.Inactive
        break;
      default:
        break;
    }
    if (status) {
      this.rerender();
    }
  }

  checkSelectedAgentFilter(id: AgentFilter) {
    return this.selectedAgentFilter == id;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../../services/auth.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import * as dayjs from 'dayjs';
import * as  utc from 'dayjs/plugin/utc'
import { environment } from 'src/environments/environment';
dayjs.extend(utc)

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  isAdmin: boolean = true;
  currentUser: any = null;
  fileList: any[] = [];

  constructor(
    private authService: AuthService,
    private apiCallService: ApiCallService) { }

  ngOnInit(): void {

    this.authService.currentLoggedInUser$.subscribe((res) => {
      if (res) {
        this.currentUser = res;
        this.isAdmin = this.currentUser.role === 'Admin';
        const payload: any = {}
        if (!this.isAdmin) {
          payload.userID = this.currentUser._id;
        }
        this.apiCallService.sendGetRequest('interaction/get-excel-links', payload, true).then((res: any) => {
          this.fileList = res.data;
          this.fileList.forEach(f => {
            f.createdAt = dayjs(f.createdAt).utc().local().format()
          })
          // this.fileList = [...this.fileList, ...this.fileList];
          // this.fileList = [...this.fileList, ...this.fileList];
          // this.fileList = [...this.fileList, ...this.fileList];
          // this.fileList = [...this.fileList, ...this.fileList];
          // this.fileList = [...this.fileList, ...this.fileList];
        })
      }
    })

  }

  downloadFile(file: any) {
    // window.open(`${environment.url.substring(0, environment.url.length - 5)}/${path}`);
    // window.open(`${window.origin}/${path}`);
    // this.apiCallService.sendGetRequest('interaction/download-file/'+file._id, {}).then((res) => {console.log(res)});
    window.open(`${environment.url}interaction/download-file/${file._id}`);
    
  }
}


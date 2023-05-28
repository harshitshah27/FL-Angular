import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    ) {
    }

  private getUrl() {
    return environment.url;
  }

  private getHeaders() {
    return new Promise((resolve) => {
      // return headers here
      resolve({
        'x-authorization': this.getToken()
      });
    });
  }

  toQueryString(obj: any, prefix?: any): any {
    var str = [], k, v: any;
    for(var p in obj) {
        if (!obj.hasOwnProperty(p)) {continue;} // skip things from the prototype
        if (~p.indexOf('[')) {
            k = prefix ? prefix + '[' + p.substring(0, p.indexOf('[')) + ']' + p.substring(p.indexOf('[')) : p;
        // only put whatever is before the bracket into new brackets; append the rest
        } else {
            k = prefix ? prefix + '[' + p + ']' : p;
        }
        v = obj[p];
        str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    return str.join('&');
  }

  public async sendGetRequest(endpoint: string, payload?: any, isUserInit = false) {
    this.spinner.show();
    let url = this.getUrl() + endpoint;
    let headers: any;
    if (payload) {
      url += '?' + this.toQueryString(payload);
    }
    if (isUserInit) {
      headers = {
        'x-authorization': this.getToken()
      };
    } else {
      await this.getHeaders().then(res => {
        headers = res;
      });
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(url, {
          headers
        })
        .pipe(
          catchError(
            this.errorHandler.handleError('sendGetRequest', reject)
          )
        )
        .subscribe((response: any) => {
          if (response) {
            this.spinner.hide();
            resolve(response);
          } else {
            this.spinner.hide();
            reject()
          }
        })
    })
  }

  public async sendGetRequestBlob(endpoint: string, payload?: any, isUserInit = false) {
    this.spinner.show();
    let url = this.getUrl() + endpoint;
    let headers: any
    if(payload) {
      url += '?' + this.toQueryString(payload);
    }
    if (isUserInit) {
      headers = { 
        authorization: this.getToken()
      }
    } else {
      await this.getHeaders().then(res => { headers = res });
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(url, {headers, responseType: 'blob'})
        .pipe(catchError( this.errorHandler.handleError('sendGetRequest', reject) ))
        .subscribe((response: any) => {
          if (response) {
            this.spinner.hide();
            resolve(response);
          } else {
            this.spinner.hide();
            reject()
          }
        })
    })
  }

  public async sendPostRequest(endpoint: string, payload: any, addToken = true) {
    this.spinner.show();
    Object.keys(payload).forEach((k) => typeof payload[k] !== 'boolean' && (payload[k] == null || payload[k] == '')  && delete payload[k]);
    const url = this.getUrl() + endpoint;
    let headers = {};
    if (addToken) {
      await this.getHeaders().then((res: any) => {
        headers = res;
      });
    }
    return new Promise((resolve, reject) => {
      this.http
        .post(url, payload, {
          headers: headers
        })
        .pipe(
          catchError(
            this.errorHandler.handleError('sendPostRequest', reject)
          )
        )
        .subscribe((response: any) => {
          if (response) {
            this.spinner.hide();
            resolve(response);
          } else {
            this.spinner.hide();
            reject()
          }
        })
    })
  }

  public async sendPatchRequest(endpoint: string, payload: any) {
    this.spinner.show();
    const url = this.getUrl() + endpoint;
    Object.keys(payload).forEach((k) => typeof payload[k] !== 'boolean' && (payload[k] == null || payload[k] == '')  && delete payload[k]);
    let headers: any;
    await this.getHeaders().then(res => {
      headers = res
    });
    return new Promise((resolve, reject) => {
      this.http
        .patch(url, payload, {
          headers
        })
        .pipe(
          catchError(
            this.errorHandler.handleError('sendPatchRequest', reject)
          )
        )
        .subscribe((response: any) => {
          if (response) {
            this.spinner.hide();
            resolve(response);
          } else {
            this.spinner.hide();
            reject()
          }
        })
    })
  }

  public async sendPutRequest(endpoint: string, payload: any) {
    this.spinner.show();
    const url = this.getUrl() + endpoint;
    let headers: any;
    await this.getHeaders().then(res => {
      headers = res
    });
    return new Promise((resolve, reject) => {
      this.http
        .put(url, payload, {
          headers
        })
        .pipe(
          catchError(
            this.errorHandler.handleError('sendPatchRequest', reject)
          )
        )
        .subscribe((response: any) => {
          if (response) {
            this.spinner.hide();
            resolve(response);
          } else {
            this.spinner.hide();
            reject();
          }
        });
    });
  }

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }
}

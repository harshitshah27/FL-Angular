import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionListRerenderService {
  private subject: Subject<any> = new Subject<any>();

  constructor() { }

  rerender() {
    // console.log('interaction service rerender start');
    this.subject.next(true);
    // console.log('interaction service rerender end');

  }
  getRerender(): Observable<any> {
    return this.subject.asObservable();
  }
}

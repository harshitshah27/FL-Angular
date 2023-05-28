import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navigationListSubject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  setNavigationList(navigationList: any[]) {
    this.navigationListSubject.next(navigationList);
  }

  getNavigationList() {
    return this.navigationListSubject.asObservable();
  }
}

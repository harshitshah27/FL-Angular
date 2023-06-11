import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navigationListSubject: BehaviorSubject<any> = new BehaviorSubject({});
  routerUrlSubject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  setNavigationList(navigationList: any[]) {
    this.navigationListSubject.next(navigationList);
  }

  getNavigationList() {
    return this.navigationListSubject.asObservable();
  }

  setRouterUrl(routerUrl: string) {
    this.routerUrlSubject.next(routerUrl);
  }

  getRouterUrl() {
    return this.routerUrlSubject.asObservable();
  }
}

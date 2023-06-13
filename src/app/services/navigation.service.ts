import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  routerUrlSubject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  setRouterUrl(routerUrl: string) {
    this.routerUrlSubject.next(routerUrl);
  }

  getRouterUrl() {
    return this.routerUrlSubject.asObservable();
  }
}

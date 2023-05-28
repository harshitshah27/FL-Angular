import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(true);
  currentLoggedInUser$ = new BehaviorSubject<any>(null);
  orgData$ = new BehaviorSubject<any>(null);



  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  signIn(): void {
    this.isLoggedIn$.next(true);
  }

  signOut(): void {
    this.isLoggedIn$.next(false);
  }
  
  clearLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("user-org-data");
  }
}

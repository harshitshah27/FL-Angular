import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { ApiCallService } from "./services/api-call.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  isLoggedIn$!: Observable<boolean>;
  token: string | any;
  socketInterval: any;
  isLoggedIn: boolean = true;
  constructor(
    private authService: AuthService,
    private apiCallService: ApiCallService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    console.log(this.isLoggedIn$)
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
      if (res) {
        // this.authService.getCurrentUser();
        // this.connectWebSocket();
      }
    });
  }
}

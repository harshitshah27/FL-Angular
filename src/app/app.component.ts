import { Component } from '@angular/core';
import { fromEvent, Observable, retry } from 'rxjs';
import { AuthService } from './services/auth.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketMessageType } from './enums/socket-message-type';
import { environment } from 'src/environments/environment';
import { InteractionListRerenderService } from './services/interaction-list-rerender.service';
import { ApiCallService } from './services/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$!: Observable<boolean>;
  token: string | any;
  socketInterval: any;
  constructor(
    private authService: AuthService,
    private apiCallService: ApiCallService,
    private snackBar: MatSnackBar,
    private interactionListRerenderService: InteractionListRerenderService
  ) {
  }

  ngOnInit(): void {
    // this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.authService.isLoggedIn$.subscribe((res) => {
      // this.isLoggedIn = res;
      if (res) {
        // this.authService.getCurrentUser();
        // this.connectWebSocket();
      }
    })
  }

 
}

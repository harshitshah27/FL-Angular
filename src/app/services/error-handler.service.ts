import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router: Router,
    ) { }

  public handleError<T>(
    operation = 'operation',
    reject?: (reason?: any) => void,
    result?: T,
    passError?: boolean,
    redirectOnError = true
  ) {
    return (error: any): Observable<T> => {
      if (redirectOnError) {
        switch (error.status) {
          
        }
      }
      // reject the Promise
      if ( passError && reject ) {
        reject({ errorInRequest: error });
      }

      
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}

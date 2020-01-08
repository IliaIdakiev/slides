import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { delay, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  loadUsers() {
    // return of(null).pipe(delay(3000), switchMap(() => throwError('BAD!')));
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(delay(5000), tap(console.log));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  loadPosts() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').pipe(delay(3000), tap(console.log));
  }

  loadUserPosts(userId: number) {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts?userId=' + userId).pipe(delay(3000), tap(console.log));
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionTypes, SetPostsAction } from './app.actions';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AppEffects {
  constructor(private http: Http, private actions$: Actions) { }

  // tslint:disable-next-line:member-ordering
  @Effect() fetchPost$ = this.actions$.ofType(ActionTypes.FETCH_POSTS)
      .mergeMap(_ => this.http.get('https://jsonplaceholder.typicode.com/posts'))
      .map(res => res.json())
      .map(posts => new SetPostsAction({ posts }));
}
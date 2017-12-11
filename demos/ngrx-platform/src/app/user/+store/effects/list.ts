import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ActionTypes, LoadUsersSuccess } from '../actions/list';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { IUser } from '../interfaces/user';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }
  @Effect() load$: Observable<Action> = this.actions$.ofType(ActionTypes.LOAD_USERS)
    .pipe(
    switchMap(() => this.http.get<IUser[]>('users')),
    map((users: IUser[]) => new LoadUsersSuccess({ users }))
    );
}

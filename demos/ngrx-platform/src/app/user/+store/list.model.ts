import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllUsers } from './selectors';
import { Observable } from 'rxjs/Observable';
import { IUser } from './interfaces/user';
import { State } from './reducers/list';
import { LoadUsers } from './actions/list';

@Injectable()
export class ListModel {
  users$: Observable<IUser[]>;
  constructor(private store: Store<State>) {
    this.users$ = this.store.select(getAllUsers);
  }

  loadUsers() {
    this.store.dispatch(new LoadUsers());
  }
}

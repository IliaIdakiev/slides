import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../actions/list';
import { IAppState } from 'src/app/+store';
import { getUserListStateIsLoaded, getUserListStateUsers } from '../selectors';

@Injectable({
  providedIn: 'root'
})
export class UserListModel {
  users$ = this.store.select(getUserListStateUsers);
  isLoaded$ = this.store.select(getUserListStateIsLoaded);

  constructor(private store: Store<IAppState>) { }

  loadUsers = () => {
    this.store.dispatch(loadUsers());
  }
}

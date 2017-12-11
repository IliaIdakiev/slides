import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers/global';
import { SetFetching } from './actions/global';
import { Observable } from 'rxjs/Observable';
import { getGlobalIsFetching } from './selectors';

@Injectable()
export class GlobalModel {
  fetching$: Observable<boolean>;
  constructor(private store: Store<State>) {
    this.fetching$ = this.store.select(getGlobalIsFetching);
  }

  setFetching(isFetching: boolean) {
    this.store.dispatch(new SetFetching({ isFetching }));
  }
}

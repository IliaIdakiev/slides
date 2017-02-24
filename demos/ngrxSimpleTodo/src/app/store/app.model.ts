import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, todoReducer, getTodos, getFilterState, getFilteredTodos, getPosts, getFetching } from './app.reducer';
import { Todo } from '../todo.model';
import { Observable } from 'rxjs/Observable';
import { FilterState } from '../filter-state.enum';
import { SaveTodoAction, CompleteTodoAction, SetFilterAction, FetchPostsAction } from './app.actions';

@Injectable()
export class AppModel {
  todos$: Observable<Todo[]>;
  posts$: Observable<any[]>;
  filterState$: Observable<FilterState>;
  fetching$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {
    this.todos$ = this._store.select(s => getFilteredTodos(s));
    this.posts$ = this._store.select(s => getPosts(s));
    this.filterState$ = this._store.select(s => getFilterState(s));
    this.fetching$ = this._store.select(s => getFetching(s));
  }

  addTodo(todo: Todo) {
    this._store.dispatch(new SaveTodoAction({ todo }));
  }

  toggleCompleted(todo: Todo) {
    this._store.dispatch(new CompleteTodoAction({ id: todo.id }));
  }

  setFilter(filterState: FilterState) {
    this._store.dispatch(new SetFilterAction({ filterState }));
  }

  fetchPosts() {
    this._store.dispatch(new FetchPostsAction());
  }
}


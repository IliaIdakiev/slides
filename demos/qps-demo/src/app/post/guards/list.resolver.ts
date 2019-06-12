import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { switchMap, first, tap, mapTo } from 'rxjs/operators';
import { QueryParamsStore } from 'query-params-store';
import { IQueryData } from '../../shared/interfaces';
import { PostService } from '../post.service';
import { LoaderService } from '../../shared/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<boolean> {

  constructor(
    private postService: PostService,
    private queryParamsStore: QueryParamsStore<IQueryData>,
    private loaderService: LoaderService
  ) { }

  resolve(): Observable<boolean> {
    return this.postService.list$.pipe(first(), switchMap(({ posts }) => {
      if (posts) { return [true]; }
      this.loaderService.toggleLoader();
      return this.queryParamsStore.store.pipe(
        first(),
        switchMap(s => this.postService.getAll(s)),
        tap(() => this.loaderService.toggleLoader()),
        mapTo(true)
      );
    }));
  }
}

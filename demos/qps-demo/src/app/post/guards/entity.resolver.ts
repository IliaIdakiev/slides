import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, first, tap } from 'rxjs/operators';
import { QueryParamsStore } from 'query-params-store';
import { IPost, IQueryData } from '../../shared/interfaces';
import { PostService } from '../post.service';
import { LoaderService } from '../../shared/loader.service';

@Injectable({
  providedIn: 'root'
})
export class EntityResolver implements Resolve<Observable<IPost>> {

  constructor(
    private postService: PostService,
    private loaderService: LoaderService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IPost> {
    const id = +route.params.id;
    if (!id) { return null; }
    this.loaderService.toggleLoader();
    return this.postService.getOne(id).pipe(tap(() => this.loaderService.toggleLoader()));
  }
}

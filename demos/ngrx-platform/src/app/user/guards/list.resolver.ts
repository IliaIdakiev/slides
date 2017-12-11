import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ListModel } from '../+store/list.model';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';


@Injectable()
export class ListResolver implements Resolve<Observable<boolean>> {
  constructor(private listModel: ListModel) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.listModel.loadUsers();
    return this.listModel.users$.pipe(map(users => !!users), filter(isLoaded => isLoaded), first());
  }
}

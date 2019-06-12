import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _showLoader = false;
  private _loading$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() {
    this._loading$.next(this._showLoader);
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  toggleLoader() {
    this._showLoader = !this._showLoader;
    this._loading$.next(this._showLoader);
  }
}

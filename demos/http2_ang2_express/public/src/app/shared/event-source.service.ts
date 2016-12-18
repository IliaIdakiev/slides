import { Injectable, Inject, EventEmitter } from '@angular/core';
import { EventSource } from './event-source.provider';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Injectable()
export class EventSourceService {
  source:any = null;
  constructor(@Inject(EventSource) private _EventSource:any) { }

  connect(url:string) {
    this.source = new this._EventSource(url)
  }

  on(event):Observable<any> {
    return Observable.fromEvent(this.source, event);
  }
}

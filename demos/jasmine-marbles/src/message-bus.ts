import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class MessageBus {
  _mbus: Subject<{ type: string, data: any }>;

  constructor() {
    this._mbus = new Subject<{ type: string, data: any }>();
    this._mbus.subscribe(console.log);
  }

  listen(type: string) {
    return this._mbus.pipe(filter(m => m.type === type), map(m => m.data));
  }

  send(type: string, data: any) {
    this._mbus.next({ type, data });
  }

};

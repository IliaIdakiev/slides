import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { GlobalModel } from './+store/global.model';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private globalModel: GlobalModel) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.globalModel.setFetching(true);
    return next.handle(req.clone({ url: `https://jsonplaceholder.typicode.com/${req.url}` }))
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.globalModel.setFetching(false);
        }
      }));
  }
}

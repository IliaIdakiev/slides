import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient } from '@angular/common/http';
import { GlobalModel } from './core/+store/global.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fetching$: Observable<boolean>;
  constructor(private globalModel: GlobalModel, private http: HttpClient) {
  }

  ngOnInit() {
    this.fetching$ = this.globalModel.fetching$;
  }

  do() {
    this.http.get('users').subscribe(console.log);
  }


}

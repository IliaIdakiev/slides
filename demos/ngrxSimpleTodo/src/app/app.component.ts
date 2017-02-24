import { Component } from '@angular/core';
import { AppModel } from './store/app.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Ngrx Todo';

  constructor(private model: AppModel) {

  }

  fetchPosts() {
    this.model.fetchPosts();
  }
}

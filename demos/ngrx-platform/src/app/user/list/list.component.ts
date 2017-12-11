import { Component, OnInit } from '@angular/core';
import { ListModel } from '../+store/list.model';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../+store/interfaces/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users$: Observable<IUser[]>;
  constructor(private listModel: ListModel) {
  }

  ngOnInit() {
    this.users$ = this.listModel.users$;
  }

}

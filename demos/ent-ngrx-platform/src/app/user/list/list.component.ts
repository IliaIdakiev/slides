import { Component, OnInit } from '@angular/core';
import { UserListModel } from '../+store/models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users$ = this.userListModel.users$;
  isLoaded$ = this.userListModel.isLoaded$;

  constructor(private userListModel: UserListModel) { }

  ngOnInit() {
    this.userListModel.loadUsers();
  }

}

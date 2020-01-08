import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.data);
  }

  selectedUserId = null;

  ngOnInit() {
  }

}

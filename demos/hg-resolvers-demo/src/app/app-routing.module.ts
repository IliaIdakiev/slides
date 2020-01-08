import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AboutComponent } from './about/about.component';
import { UserListResolver } from './user-list.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
    // resolve: {
    //   users: UserListResolver
    // }
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

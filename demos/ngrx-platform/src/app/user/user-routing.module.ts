import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { ListResolver } from './guards/list.resolver';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ListComponent,
    resolve: [ListResolver]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  }
];

export const UserRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);

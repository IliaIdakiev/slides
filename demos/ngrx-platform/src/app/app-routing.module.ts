import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);

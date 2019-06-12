import { RouterModule } from '@angular/router';
import { IQueryParamStoreRoutes } from 'query-params-store';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: IQueryParamStoreRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'post'
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(mod => mod.PostModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

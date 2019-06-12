import { RouterModule } from '@angular/router';
import { IQueryParamStoreRoutes } from 'query-params-store';
import { ListComponent } from './list/list.component';
import { ListResolver } from './guards/list.resolver';
import { EntityResolver } from './guards/entity.resolver';

const routes: IQueryParamStoreRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/post/list'
  },
  {
    path: 'post/list',
    component: ListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: [ListResolver],
    data: {
      dialogComponentReuse: true,
      queryParamsConfig: {
        defaultValues: {
          page: 1,
          pageSize: 20,
          filter: ''
        }
      }
    },
    children: [
      {
        path: 'add',
        component: ListComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        data: {
          dialogComponentReuse: true,
          dialogId: 'add-post',
          queryParamsConfig: {
            inherit: true
          }
        }
      },
      {
        path: 'edit/:id',
        resolve: [EntityResolver],
        component: ListComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        data: {
          dialogComponentReuse: true,
          dialogId: 'edit-post',
          queryParamsConfig: {
            inherit: true
          }
        }
      }
    ]
  },
];

export const PostRoutingModule = RouterModule.forChild(routes);

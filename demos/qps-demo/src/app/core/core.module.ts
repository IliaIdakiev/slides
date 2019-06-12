import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DialogRouteReuseStrategy } from './dialog-route-reuse-strategy';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavigationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: DialogRouteReuseStrategy
    },
  ],
  exports: [
    NavigationComponent,
    LoaderComponent
  ]
})
export class CoreModule { }

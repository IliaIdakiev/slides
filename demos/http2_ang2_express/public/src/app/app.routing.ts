import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';

export const routes:Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule'
    },
    {
        path: 'about',
        loadChildren: 'app/about/about.module#AboutModule'
    }
];

export const AppRoutingModule:ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading });
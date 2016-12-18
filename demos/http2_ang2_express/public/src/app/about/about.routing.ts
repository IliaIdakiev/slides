import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { CompanyComponent } from './company/company.component';
import { TeamComponent } from './team/team.component'; 

export const routes:Routes = [
    {
        path: '',
        component: AboutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'company'
            },
            {
                path: 'company',
                component: CompanyComponent
            }, {
                path: 'team',
                component: TeamComponent
            }
        ]
    }
];

export const AboutRoutingModule:ModuleWithProviders = RouterModule.forChild(routes);
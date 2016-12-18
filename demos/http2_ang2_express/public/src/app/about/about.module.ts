import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about.routing';
import { CompanyComponent } from './company/company.component';
import { TeamComponent } from './team/team.component';


@NgModule({
  declarations: [
    AboutComponent,
    CompanyComponent,
    TeamComponent
  ],
  imports: [
    AboutRoutingModule
  ]
})
export class AboutModule { }

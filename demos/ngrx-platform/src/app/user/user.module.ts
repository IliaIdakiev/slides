import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ListModel } from './+store/list.model';
import { ListResolver } from './guards/list.resolver';
import { reducers } from './+store/reducers';
import { ListEffects } from './+store/effects/list';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature([ListEffects])
  ],
  providers: [ListModel, ListResolver],
  declarations: [ListComponent, ProfileComponent]
})
export class UserModule { }

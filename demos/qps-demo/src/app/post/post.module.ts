import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EntityComponent } from './entity/entity.component';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    EntityComponent
  ],
  imports: [
    PostRoutingModule,
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule
  ],
  entryComponents: [
    EntityComponent
  ]
})
export class PostModule { }

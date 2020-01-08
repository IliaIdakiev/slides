import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HGResolversModule } from 'hg-resolvers';
import { HttpClientModule } from '@angular/common/http';
import { UserListResolverDirective } from './-resolvers/user-list.resolver';
import { PostListResolverDirective } from './-resolvers/post-list.resolver';
import { UserPostsResolverDirective } from './-resolvers/user-posts.resolver';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserListResolverDirective,
    PostListResolverDirective,
    UserPostsResolverDirective,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HGResolversModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Directive, Input } from '@angular/core';
import { Resolver, HG_RESOLVERS, ResolverConfig, toObservable } from 'hg-resolvers';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appUserPostsResolver]',
  providers: [
    {
      provide: HG_RESOLVERS,
      multi: true,
      useExisting: UserPostsResolverDirective
    }
  ],
  exportAs: 'appUserPostsResolver'
}) export class UserPostsResolverDirective extends Resolver<any[]> {

  @Input('appUserPostsResolver') shouldSkip;

  config = ResolverConfig.AutoResolve;

  @Input() @toObservable selectedUserId: Observable<number>;

  autoUniqueId = true;

  constructor(postService: PostService) {
    super(([id]: [number]) => postService.loadUserPosts(id), () => this.selectedUserId);
  }

}

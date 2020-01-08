import { Directive } from '@angular/core';
import { Resolver, HG_RESOLVERS } from 'hg-resolvers';
import { PostService } from '../post.service';

@Directive({
  selector: '[appPostListResolver]',
  providers: [
    {
      provide: HG_RESOLVERS,
      multi: true,
      useExisting: PostListResolverDirective
    }
  ],
  exportAs: 'appPostListResolver'
}) export class PostListResolverDirective extends Resolver<any[]> {

  constructor(postService: PostService) {
    super(() => postService.loadPosts());
  }
}

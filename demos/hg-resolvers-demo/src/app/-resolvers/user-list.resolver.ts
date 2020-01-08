import { Directive } from '@angular/core';
import { Resolver, HG_RESOLVERS } from 'hg-resolvers';
import { UserService } from '../user.service';

@Directive({
  selector: '[appUserListResolver]',
  providers: [
    {
      provide: HG_RESOLVERS,
      multi: true,
      useExisting: UserListResolverDirective
    }
  ],
  exportAs: 'appUserListResolver'
}) export class UserListResolverDirective extends Resolver<any[]> {

  constructor(userService: UserService) {
    super(() => userService.loadUsers());
  }
}

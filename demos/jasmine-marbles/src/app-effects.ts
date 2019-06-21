import { MessageBus } from './message-bus';
import { UserService } from './user-service';
import { Scheduler, merge, Observable, zip } from 'rxjs';
import { switchMap, delay, startWith, catchError, map } from 'rxjs/operators';

export class AppEffects {

  login$ = this.messageBus.listen('[AUTH] Login').pipe(
    switchMap(data => this.userService.login(data).pipe(
      delay(2000),
      switchMap((user) => [
        { type: '[AUTH] Login Success', data: user },
        { type: '[USERS] Load Users', data: null }
      ]),
      startWith({ type: '[GLOBAL] Set Loader', data: true }),
      catchError(error => [
        { type: '[GLOBAL] Set Loader', data: false },
        { type: '[AUTH] Login Failed', data: error }
      ])
    ))
  );

  loadUsers$ = this.messageBus.listen('[USERS] Load Users').pipe(
    switchMap(() => this.userService.loadUsers().pipe(
      switchMap(users => [
        { type: '[GLOBAL] Set Loader', data: false },
        { type: '[USERS] Load Users Success', data: users }
      ]),
      startWith({ type: '[GLOBAL] Set Loader', data: true }),
      catchError(error => [
        { type: '[GLOBAL] Set Loader', data: false },
        { type: '[USERS] Load Users Failed', data: error },
      ])
    ))
  );

  loadUserAndPostsWithComments$ = this.messageBus.listen('[USERS] Load User And Posts With Comments').pipe(
    switchMap((id) => {
      return zip(
        this.userService.loadUser(id),
        this.userService.loadUserPosts(id)
      ).pipe(
        switchMap(([user, userPosts]) => {
          const ops = userPosts.map(post => this.userService.loadPostComments(post.id).pipe(map(comments => ({ ...post, comments }))));

          return zip<any[]>(...ops).pipe(
            map(postsWithComments => {
              return ({ user, postsWithComments })
            })
          );
        }),
        switchMap((args) => {
          const { user, postsWithComments } = args;
          return [
            { type: '[GLOBAL] Set Loader', data: false },
            { type: '[USERS] Load User And Posts With Comments Success', data: { ...user, posts: postsWithComments } }
          ]
        }),
        startWith({ type: '[GLOBAL] Set Loader', data: true }),
        catchError(error => {
          return [
            { type: '[GLOBAL] Set Loader', data: false },
            { type: '[USERS] Load User And Posts With Comments Failed', data: error },
          ];
        })
      )
    })
  );

  constructor(private messageBus: MessageBus, private userService: UserService) { }

  connect = () => {
    merge(...Object.values(this).filter(val => val instanceof Observable)).subscribe(this.messageBus._mbus);
  }
}

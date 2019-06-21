import { getTestScheduler } from 'jasmine-marbles';
import { defer } from 'rxjs';

function delayPromise(duration) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(...args);
      }, duration)
    });
  };
}

import { TestScheduler } from 'rxjs/testing';
import { MessageBus } from './message-bus';
import { AppEffects } from './app-effects';
import { UserService } from './user-service';
import { App } from './app';

describe('Message Bus Testing', () => {
  let messageBus: MessageBus;

  beforeEach(() => {
    messageBus = new MessageBus();
  });

  it('should construct message bus correctly', () => {
    expect(messageBus._mbus).toBeTruthy();
  });

  it('should test emit', () => {
    spyOn(messageBus, 'send').and.callThrough();
    spyOn(messageBus._mbus, 'next');
    messageBus.send('[TEST] Test 1', 123);
    expect(messageBus.send).toHaveBeenCalledWith('[TEST] Test 1', 123);
    expect(messageBus._mbus.next).toHaveBeenCalledWith({ type: '[TEST] Test 1', data: 123 });
  });

  describe('message bus methods', () => {
    let actions$: any;
    let scheduler: TestScheduler;

    beforeEach(() => {
      scheduler = getTestScheduler();
      messageBus._mbus = defer(() => actions$) as any;
    });

    it('should test listen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('^-a----b--|', {
          a: { type: '[TEST] Test 1', data: 123 },
          b: { type: '[TEST] Test 2', data: 345 }
        });

        expectObservable(messageBus.listen('[TEST] Test 2')).toBe('-------b--|', {
          b: 345
        });
      });
    });
  });

});

describe('App Effects Testing', () => {
  let effects: AppEffects;
  let messageBus: MessageBus;
  let actions$: any;
  let scheduler: TestScheduler;
  let userService: UserService;

  beforeEach(() => {
    messageBus = new MessageBus();
    messageBus._mbus = defer(() => actions$) as any;
    userService = new UserService();
    scheduler = getTestScheduler();
    effects = new AppEffects(messageBus, userService);
    effects.connect();
  });

  it('should test login success', () => {
    scheduler.run(({ cold, expectObservable, flush }) => {
      const spy = spyOn(userService, 'login').and.callThrough();
      actions$ = cold('--a', {
        a: { type: '[AUTH] Login', data: { email: 'aaa', password: 'aaa' } }
      });
      expectObservable(effects.login$).toBe('--a 1999ms (bc)', {
        a: { type: '[GLOBAL] Set Loader', data: true },
        b: { type: '[AUTH] Login Success', data: { firstName: "Ivan", lastName: "Ivanov" } },
        c: { type: '[USERS] Load Users', data: null }
      });
      flush();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ email: 'aaa', password: 'aaa' });
    });
  });

  it('should test login fail', () => {
    scheduler.run(({ cold, expectObservable }) => {
      spyOn(userService, 'login').and.returnValue(cold('---#', null, 'Test Error'));
      actions$ = cold('--a', {
        a: { type: '[AUTH] Login', data: { email: 'aaa', password: 'aaa' } }
      });
      expectObservable(effects.login$).toBe('--a--(bc)', {
        a: { type: '[GLOBAL] Set Loader', data: true },
        b: { type: '[GLOBAL] Set Loader', data: false },
        c: { type: '[AUTH] Login Failed', data: 'Test Error' },
      });
    });
    expect(userService.login).toHaveBeenCalledTimes(1);
  });

  it('should test user load success', () => {

    scheduler.run(({ cold, expectObservable }) => {
      const users = [{ firstName: 'a', lastName: 'a' }];
      spyOn(userService, 'loadUsers').and.returnValue(cold('---a|', { a: users }));
      actions$ = cold('--a', {
        a: { type: '[USERS] Load Users', data: null }
      });
      expectObservable(effects.loadUsers$).toBe('--a--(bc)', {
        a: { type: '[GLOBAL] Set Loader', data: true },
        b: { type: '[GLOBAL] Set Loader', data: false },
        c: { type: '[USERS] Load Users Success', data: users },
      });
    });
    expect(userService.loadUsers).toHaveBeenCalledTimes(1);
  });

  it('should test user load fail', () => {
    scheduler.run(({ cold, expectObservable }) => {
      spyOn(userService, 'loadUsers').and.returnValue(cold('---#', null, 'Test Error'));
      actions$ = cold('--a', {
        a: { type: '[USERS] Load Users', data: null }
      });
      expectObservable(effects.loadUsers$).toBe('--a--(bc)', {
        a: { type: '[GLOBAL] Set Loader', data: true },
        b: { type: '[GLOBAL] Set Loader', data: false },
        c: { type: '[USERS] Load Users Failed', data: 'Test Error' },
      });
    });
    expect(userService.loadUsers).toHaveBeenCalledTimes(1);
  });

  it('should test user and posts with comments load success', () => {

    scheduler.run(({ cold, expectObservable }) => {
      const user = {
        id: 1,
        firstName: 'Ivan',
        lastName: 'Ivanov'
      };

      const posts = [
        { userId: 1, id: 1, title: 'Title 1' },
        { userId: 1, id: 2, title: 'Title 2' },
      ];

      const post1Comments = [
        { postId: 1, id: 1, comment: 'Post 1 Comment 1' },
        { postId: 1, id: 2, comment: 'Post 1 Comment 2' }
      ]
      const post2Comments = [
        { postId: 2, id: 3, comment: 'Post 2 Comment 1' },
        { postId: 2, id: 4, comment: 'Post 2 Comment 2' }
      ]

      spyOn(userService, 'loadUser').and.returnValue(cold('---a|', { a: user }));
      spyOn(userService, 'loadUserPosts').and.returnValue(cold('---a|', { a: posts }));
      spyOn(userService, 'loadPostComments').and.returnValues(cold('---a|', { a: post1Comments }), cold('---a|', { a: post2Comments }));

      actions$ = cold('--a', {
        a: { type: '[USERS] Load User And Posts With Comments', data: 1 }
      });

      expectObservable(effects.loadUserAndPostsWithComments$).toBe('--a-----(bc)', {
        a: { type: '[GLOBAL] Set Loader', data: true },
        b: { type: '[GLOBAL] Set Loader', data: false },
        c: {
          type: '[USERS] Load User And Posts With Comments Success', data: {
            ...user,
            posts: [
              { ...posts[0], comments: post1Comments },
              { ...posts[1], comments: post2Comments }
            ]
          }
        },
      });
    });
    expect(userService.loadUser).toHaveBeenCalledWith(1);
    expect(userService.loadUserPosts).toHaveBeenCalledWith(1);
    expect(userService.loadPostComments).toHaveBeenCalledWith(1);
    expect(userService.loadPostComments).toHaveBeenCalledWith(2);
  });

});

describe('App Component Tests', () => {
  let messageBus: MessageBus;
  let scheduler: TestScheduler;
  let actions$: any;

  beforeEach(() => {
    scheduler = getTestScheduler();
    messageBus = new MessageBus();
    messageBus._mbus = defer(() => actions$) as any;
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should create and render component successfuly', () => {
    const app = new App(messageBus, null);
    spyOn(app, 'changeHandler').and.callThrough();
    app.connectedCallback();

    expect(app).toBeTruthy();
    expect(app.changeHandler).toHaveBeenCalledTimes(1);
  });


  it('should rerender component successfuly', () => {
    scheduler.run(({ hot, expectSubscriptions }) => {
      actions$ = hot('----|');
      const app = new App(messageBus, null);
      spyOn(app, 'changeHandler').and.callThrough();
      app.connectedCallback();
      expectSubscriptions(actions$.subscriptions).toBe(['^---!', '^---!', '^---!']);
      expect(app.changeHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('should rerender with loading', () => {
    scheduler.run(({ hot, flush }) => {
      actions$ = hot('--a--|', {
        a: { type: '[GLOBAL] Set Loader', data: true }
      });
      const app = new App(messageBus, null);
      spyOn(app, 'changeHandler').and.callThrough();
      app.connectedCallback();

      flush();

      expect(app.isLoading).toBe(true);
      expect(app.changeHandler).toHaveBeenCalledTimes(2);
    });
  });

  it('should rerender only once with multiple changes', () => {
    return scheduler.run(async ({ hot }) => {

      const app = new App(messageBus, function () { } as any);
      const renderSpy = spyOn(app as any, 'render').and.callThrough();

      const user = { firstName: 'Ivan', lastName: 'Ivanov' };
      actions$ = hot('-----(ab)--|', {
        a: { type: '[GLOBAL] Set Loader', data: true },
        b: { type: '[AUTH] Login Success', data: user },
      });

      spyOn(app, 'changeHandler').and.callThrough();

      document.body.appendChild(app);

      expect(app.changeHandler).toHaveBeenCalledTimes(1);
      expect(app.isLoading).toBe(false);
      expect(app.loggedUser).toBe(null);

      await delayPromise(0);

      expect(app.isLoading).toBe(true);
      expect(app.loggedUser).toBe(user);
      expect(app.changeHandler).toHaveBeenCalledTimes(3);

      await delayPromise(0);

      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

  });
});
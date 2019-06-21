import { of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

function fetchFactory(input: string | Request, init?: RequestInit) {
  return fromFetch(input, init).pipe(switchMap(res => {
    if (res.ok) { return res.json(); }
    return throwError('Could not fetch!');
  }));
}

export class UserService {

  login = (data: any) => {
    return of({ firstName: 'Ivan', lastName: 'Ivanov' })
  };

  loadUsers = () => {
    return fetchFactory('https://jsonplaceholder.typicode.com/users');
  };

  loadUser = (id: number) => {
    return fetchFactory(`https://jsonplaceholder.typicode.com/users/${id}`);
  };

  loadUserPosts = (id: number) => {
    return fetchFactory(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  }

  loadPostComments = (postId: number) => {
    return fetchFactory(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  }

};

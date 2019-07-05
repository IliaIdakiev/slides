import { html, render } from 'lit-html';
import { Subject, throwError, fromEvent, combineLatest, partition } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap, startWith, map, switchMap, mergeMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

const getTemplate = (context: App) => html`
${context.isLoading && html`<div id="loader">Loading...</div>`}
<div id="filters">
  <input id="text-filter" type="text" placeholder="Enter text...">
  <select id="user-filter">
    <option value="0" default>Select user...</option>
    ${context.userList.map(user => html`<option value="${user.id}">${user.username}</option>`)}
  </select>

  <ul>
    ${context.postList.map(post => html`<li>${post.title}</li>`)}
  </ul>
</div>
`;

export class App extends HTMLElement {

  isAlive$ = new Subject();
  scheduledRender = false;
  userList: any[] = [];
  postList: any[] = [];

  isLoading = false;
  hasError = false;

  attachHandlers: () => void = null;
  changeHandler: () => void = null;

  formData = {
    email: '',
    password: ''
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'closed' });

    this.changeHandler = () => {
      if (!this.scheduledRender) {
        this.scheduledRender = true;
        Promise.resolve().then(() => {
          this.scheduledRender = false;
          render(getTemplate(this), root);
        });
      }
    }

    this.attachHandlers = function () {
      Promise.resolve().then(() => {
        const textFilter = root.getElementById('text-filter') as HTMLInputElement;
        const userFilter = root.getElementById('user-filter') as HTMLSelectElement;

        const textFilter$ = fromEvent(textFilter, 'keyup').pipe(
          debounceTime(300),
          map(() => textFilter.value),
          distinctUntilChanged(),
          startWith('')
        );

        const [clearUserFilter$, userFilter$] = partition(fromEvent(userFilter, 'change').pipe(
          map(() => +userFilter.value)
        ), val => val === 0);

        clearUserFilter$.subscribe(() => {
          this.postList = [];
          this.changeHandler();
        });

        combineLatest(textFilter$, userFilter$)
          .pipe(switchMap(([text, userId]) => this.loadPosts(userId, text)))
          .subscribe({
            next: posts => {
              this.postList = posts;
              this.changeHandler();
            },
            error: () => {
              this.hasError = true;
              this.changeHandler();
            }
          });
      });
    }
  }

  loadPosts(userId = null, text = null) {
    this.isLoading = true;
    this.changeHandler();
    let query = '';
    if (userId) {
      query += `?userId=${userId}`
    }
    if (text) {
      if (!userId) { query += '?' }
      else { query += '&'; }
      query += `q=${text}`;
    }
    this.isLoading = true;
    this.changeHandler();

    return fromFetch(`https://jsonplaceholder.typicode.com/posts${query}`).pipe(
      tap(() => {
        this.isLoading = false
        this.changeHandler();
      }),
      mergeMap(res => res.ok ? res.json() : throwError('Couldn\'t fetch'))
    );
  }

  loadUsers() {
    return fromFetch(`https://jsonplaceholder.typicode.com/users`).pipe(
      tap(() => {
        this.isLoading = false
        this.changeHandler();
      }),
      mergeMap(res => res.ok ? res.json() : throwError('Couldn\'t fetch'))
    );
  }

  connectedCallback() {
    this.changeHandler();
    this.attachHandlers();
    this.loadUsers().subscribe({
      next: users => {
        this.userList = users;
        this.changeHandler();
      },
      error: () => {
        this.hasError = true;
        this.changeHandler();
      }
    });
  }


  disconnectedCallback() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }
}

customElements.define('hg-app', App);
import { RenderOptions, TemplateResult } from 'lit-html';
import { Subject, merge } from 'rxjs';
import { takeUntil, tap, startWith } from 'rxjs/operators';
import { MessageBus } from './message-bus';
import { loadingTemplateFactory } from './templates/loading';
import { loginTemplateFactory } from './templates/login';
import { userListTemplateFactory } from './templates/user-list';

export class App extends HTMLElement {

  isAlive$: Subject<void> = new Subject<void>();
  scheduledRender = false;

  loggedUser: { firstName: string, lastName: string } = null;
  userList: any[] = [];
  isLoading = false;

  changeHandler: () => void = null;

  formData = {
    email: '',
    password: ''
  }

  constructor(private messageBus: MessageBus, private render: (result: TemplateResult, container: Element | DocumentFragment, options?: Partial<RenderOptions>) => void) {
    super();
    const root = this.attachShadow({ mode: 'closed' });
    this.render = render;

    this.changeHandler = () => {
      if (!this.scheduledRender) {
        this.scheduledRender = true;
        debugger;
        Promise.resolve().then(() => {
          this.scheduledRender = false;
          const template = this.isLoading ?
            loadingTemplateFactory : !this.loggedUser ? loginTemplateFactory : userListTemplateFactory;
          this.render(template(this), root);
        });
      }
    }
  }

  connectedCallback() {
    const userUpdate$ = this.messageBus.listen('[AUTH] Login Success').pipe(tap(user => this.loggedUser = user));
    const usersUpdate$ = this.messageBus.listen('[USERS] Load Users Success').pipe(tap(users => this.userList = users));
    const isLoadingUpdate$ = this.messageBus.listen('[GLOBAL] Set Loader').pipe(tap(isLoading => this.isLoading = isLoading));

    merge(userUpdate$, usersUpdate$, isLoadingUpdate$).pipe(startWith(null), takeUntil(this.isAlive$)).subscribe(this.changeHandler);
  }

  loginHandler = () => {
    this.messageBus.send('[AUTH] Login', this.formData);
  }

  disconnectedCallback() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }
}

customElements.define('hg-app', App);
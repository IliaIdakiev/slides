import { App } from './app';
import { MessageBus } from './message-bus';
import { UserService } from './user-service';
import { AppEffects } from './app-effects';
import { render } from 'lit-html';

(function bootstrap() {
  const messageBus = new MessageBus();
  const userService = new UserService();
  const appEffects = new AppEffects(messageBus, userService);
  appEffects.connect();
  const app = new App(messageBus, render);
  document.body.appendChild(app);
})();

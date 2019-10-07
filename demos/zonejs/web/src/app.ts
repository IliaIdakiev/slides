import { html } from 'lit-html';
import { Component } from './decorators';
import './user-list';
import './counter';

@Component({
  selector: 'hg-app'
})
export class App {

  render() {
    return html`
    <hg-counter></hg-counter>
    <hg-user-list></hg-user-list>
  `;
  }
}
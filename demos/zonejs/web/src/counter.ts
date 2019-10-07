import { html } from 'lit-html';
import { Component } from './decorators';

@Component({
  selector: 'hg-counter'
})
export class Counter {
  counter = 0;

  increment = () => {
    this.counter++;
  }

  decrement = () => {
    this.counter--;
  }

  render() {
    return html`
    <h1>${this.counter}</h1>
    <button @click=${this.increment}>Increment</button>
    <button @click=${this.decrement}>Decrement</button>
  `;
  }
}
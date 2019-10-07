import { html } from 'lit-html';
import { Component } from './decorators';

@Component({
  selector: 'hg-user-list'
})
export class UserList {
  users;

  connectedCallback() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.users = users);
  }

  reload = () => {
    this.users = null;
    this.fetchUsers();
  }

  render() {
    return html`
    <h1>User List</h1>
    ${
      this.users ?
        html`<ul>
          ${this.users.map(({ username }) => html`<li>${username}</li>`)}
        </ul>` : html`<h2>Loading...</h2>`
      }
    <button @click=${this.reload}>Reload List</button>
  `;
  }
}
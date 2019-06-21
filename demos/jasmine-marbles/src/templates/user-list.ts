import { html } from "lit-html";
import { App } from "../app";

export const userListTemplateFactory = (context: App) => html`<div>
  <div>Hello ${context.loggedUser.firstName}!</div>
  <div>${context.userList.map((user) => html`<li>${user.username}</li>`)}</div>
</div>`;

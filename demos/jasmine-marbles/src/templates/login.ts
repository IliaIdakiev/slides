import { html } from "lit-html";
import { App } from "../app";

export const loginTemplateFactory = (context: App) => html`
<div>Login</div>
<form>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" @keyup=${(e: any) => context.formData.email = e.target.value}/>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" @keyup=${(e: any) => context.formData.password = e.target.value}/>
  </div>
  <button type="button" @click=${context.loginHandler}>Login</button>
</form>
`;
(function () {
  const template = createTemplate(`
  <div>Counter Demo</div>
  <hg-counter value="10" array="[]"></hg-counter>
  <button id="def-inc">Change attribute values</button>
  `);

  class App extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
      const counter = shadowRoot.querySelector('hg-counter')
      counter.addEventListener('change', ({ detail: { counter } }) => {
        console.log('Counter was updated to: ' + counter);
      });

      shadowRoot.querySelector('#def-inc').addEventListener('click', () => {
        counter.setAttribute('value', 30);
        counter.setAttribute('array', [1, 2, 3]);
      });
    }

    connectedCallback() {
      console.log('App was connected');
    }
  }

  customElements.define('hg-app', App);
}());
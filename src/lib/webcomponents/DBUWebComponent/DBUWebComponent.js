
class DBUWebComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
      
      </style>
      <div id="DBUWebComponent">DBUWebComponent</div>
    `;
  }
}

console.log('defining DBUWebComponent')


export default DBUWebComponent;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

console.log('defining DBUWebComponent');

exports.default = DBUWebComponent;
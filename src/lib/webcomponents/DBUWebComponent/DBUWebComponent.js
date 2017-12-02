
import DBUWebComponentBase, {
  defineCommonStaticMethods
} from '../DBUWebComponentBase/DBUWebComponentBase';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
    color: maroon;
  }
  </style>
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;

class DBUWebComponent extends DBUWebComponentBase {
  static get componentName() {
    return 'dbu-web-component';
  }

  static get template() {
    return template;
  }
}


defineCommonStaticMethods(DBUWebComponent);

export default DBUWebComponent;

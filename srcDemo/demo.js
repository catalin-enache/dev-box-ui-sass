import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  // onScreenConsole,
  localeAware
} from 'dev-box-ui';
import App from './app';

// import DBUWebComponent from '../build/src/lib/webcomponents/DBUWebComponent/DBUWebComponent';
import DBUWebComponent from '../src/lib/webcomponents/DBUWebComponent/DBUWebComponent';

// DBUWebComponent.componentStyle += `
//   b {
//     color: orange;
//     font-style: oblique;
//     text-shadow: var(--b-text-shadow, 2px 2px 2px #000000);
//   }
// `;

setTimeout(() => {
  DBUWebComponent.registerSelf();
}, 2000);


// onScreenConsole({ options: { showLastOnly: false } });

let Demo = class Demo extends React.Component {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering Demo component');
    }
    const { locale: { dir } } = this.props;
    return (
      <App />
    );
  }
};

Demo.propTypes = {
  locale: PropTypes.object
};

Demo = localeAware(Demo);

ReactDOM.render((
  <Demo/>
), document.getElementById('demo'));

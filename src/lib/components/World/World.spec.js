import React from 'react';
import ReactDOM from 'react-dom';
import { describe, it } from 'mocha';

import World from './World';

describe('World', () => {
  it('renders world', (done) => {
    ReactDOM.render(
      <World/>
      , document.querySelector('#testing')
    );
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.querySelector('#testing'));
      done();
    }, 1000);
  });
});

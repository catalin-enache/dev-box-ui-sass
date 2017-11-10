import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactTestUtils from 'react-dom/test-utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import FormInputNumber from './FormInputNumber';

/* eslint react/no-find-dom-node: 0 */

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    const { initialValue } = props;
    this.state = {
      inputValue: initialValue
    };
    this.inputNode = null;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    const { newValue } = this.props;
    expect(val).to.equal(newValue);
    expect(typeof val).to.equal('number');
    setTimeout(() => {
      this.props.done();
    }, 0);
  }

  componentDidMount() {
    const { expectedInitialValue, newValue, expectedNewValue } = this.props;
    const htmlNode =
      ReactTestUtils.findRenderedDOMComponentWithClass(this.inputNode, 'dbu-form-input');
    expect(htmlNode.value).to.equal(expectedInitialValue);

    this.setState({
      inputValue: newValue
    }, () => {
      expect(htmlNode.value).to.equal(expectedNewValue);
      ReactTestUtils.Simulate.change(htmlNode);
    });
  }

  render() {
    const { defaultDecPoint, defaultThousandsSeparator } = this.props;
    return (<FormInputNumber
      ref={(node) => this.inputNode = node}
      value={this.state.inputValue}
      onChange={this.handleChange}
      defaultDecPoint={defaultDecPoint}
      defaultThousandsSeparator={defaultThousandsSeparator}
    />);
  }
}

App.propTypes = {
  done: PropTypes.func,
  initialValue: PropTypes.number,
  expectedInitialValue: PropTypes.string,
  newValue: PropTypes.number,
  expectedNewValue: PropTypes.string,
  defaultDecPoint: PropTypes.string,
  defaultThousandsSeparator: PropTypes.string
};

describe('FormInput', () => {
  it('has default formatter', (done) => {
    ReactDOM.render(
      <App
        done={done}
        initialValue={1234.567}
        expectedInitialValue={'1234.567'}
        newValue={1000.001}
        expectedNewValue={'1000.001'}
      />
      , document.querySelector('#testing')
    );
  });
  it('accepts custom separated thousands formatter', (done) => {
    ReactDOM.render(
      <App
        done={done}
        initialValue={1234}
        expectedInitialValue={'1,234'}
        newValue={1000.001}
        expectedNewValue={'1,000.001'}
        defaultThousandsSeparator=","
      />
      , document.querySelector('#testing')
    );
  });
  it('accepts custom decPoint formatter', (done) => {
    ReactDOM.render(
      <App
        done={done}
        initialValue={1000}
        expectedInitialValue={'1 000'}
        newValue={1000.001}
        expectedNewValue={'1 000,001'}
        defaultThousandsSeparator=" "
        defaultDecPoint=","
      />
      , document.querySelector('#testing')
    );
  });
});

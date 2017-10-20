'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localeAware = require('../../HOC/localeAware');

var _localeAware2 = _interopRequireDefault(_localeAware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormInputNumber extends _react2.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  render() {
    const {
      name
    } = this.props;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        name: name,
        type: 'text',
        value: this.state.value,
        onChange: this.handleChange
      })
    );
  }
}

FormInputNumber.propTypes = {
  value: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired
};

exports.default = (0, _localeAware2.default)(FormInputNumber);
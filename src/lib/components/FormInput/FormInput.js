import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class FormInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.toString()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: (nextProps.value || '').toString()
    });
  }

  handleChange(evt) {
    const { value } = evt.target;
    this.setState({
      value
    }, () => {
      this.props.onChange(value);
    });
  }

  render() {
    const { inverse, warning, error, ...rest } = this.props;
    const inputClassNames = cn({
      'dbu-form-input': true,
      'dbu-inverse': inverse,
      'dbu-warning': warning,
      'dbu-error': error,
      'dbu-patch': true
    });
    return (
      <input
        className={inputClassNames}
        {...rest}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

FormInput.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {}
};

FormInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  inverse: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
};

export default FormInput;


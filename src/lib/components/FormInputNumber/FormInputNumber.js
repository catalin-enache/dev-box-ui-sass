import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput/FormInput';
import forceFloat from '../../utils/internals/forceFloat';

class FormInputNumber extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value.toString()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const receivedValue = nextProps.value.toString();
    const internalValue = this.state.value;
    let valueToStore = Number(internalValue) === Number(receivedValue) ? internalValue : receivedValue;

    if (['-', '+'].includes(internalValue) && receivedValue === '0') {
      valueToStore = internalValue;
    }

    this.setState({
      value: valueToStore
    });
  }

  handleChange(value) {
    const valueToUse = forceFloat(value);

    this.setState({
      value: valueToUse
    }, () => {
      this.forceUpdate(); // reason: 123.4 => 1234 / 12.3.4 => 1234(no re-render)

      const usedValue = this.state.value;
      let valueToReport = usedValue;

      if (['-', '+'].includes(valueToReport)) {
        valueToReport = 0;
      }

      const valueAsNumber = Number(valueToReport);

      this.props.onChange(valueAsNumber);
    });
  }

  get value() {
    return this.state.value;
  }

  render() {
    return (
      <FormInput
        {...this.props}
        type="text"
        value={this.value}
        onChange={this.handleChange}
      />
    );
  }
}

FormInputNumber.defaultProps = {
  value: 0,
  onChange: () => {}
};

FormInputNumber.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default FormInputNumber;


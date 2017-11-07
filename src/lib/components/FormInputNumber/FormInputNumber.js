import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput/FormInput';
import formatters from '../../utils/formatters';

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
    const valueToUse = this.props.forceFloat(value);

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
    return this.props.numberFormatter ?
      this.props.numberFormatter(this.state.value) :
      this.state.value;
  }

  render() {
    const { numberFormatter, forceFloat, ...rest } = this.props;
    return (
      <FormInput
        {...rest}
        type="text"
        value={this.value}
        onChange={this.handleChange}
      />
    );
  }
}

FormInputNumber.defaultProps = {
  value: 0,
  onChange: () => {},
  forceFloat: formatters.forceFloat({ decPoint: '.' }),
  numberFormatter: formatters.numberFormatter({ decPoint: '.', thousandsSeparator: ',' })
};

FormInputNumber.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  forceFloat: PropTypes.func,
  numberFormatter: PropTypes.func
};

export default FormInputNumber;


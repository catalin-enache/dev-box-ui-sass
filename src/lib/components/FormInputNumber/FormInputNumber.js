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
    const valueToStore = Number(internalValue) === Number(receivedValue) ? internalValue : receivedValue;
    this.setState({
      value: valueToStore
    });
  }

  handleChange(value) {
    const valueToUse = forceFloat(value);

    this.setState({
      value: valueToUse
    }, () => {
      this.forceUpdate();

      const usedValue = this.state.value;
      let valueToReport = usedValue;
      const endsWithPoint = usedValue.endsWith('.');

      if (endsWithPoint) {
        valueToReport = valueToReport.substr(0, valueToReport.length - 1);
      }

      const valueAsNumber = Number(valueToReport);
      const isNan = Number.isNaN(valueAsNumber);

      if (isNan) {
        return;
      }

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


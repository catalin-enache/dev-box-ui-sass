import React from 'react';
import PropTypes from 'prop-types';
import localeAware from '../../HOC/localeAware';

class FormInputNumber extends React.PureComponent {
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

    return (
      <div>
        <input
          name={name}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

FormInputNumber.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default localeAware(FormInputNumber);


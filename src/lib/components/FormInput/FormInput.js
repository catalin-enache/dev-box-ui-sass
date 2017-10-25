import React from 'react';
import PropTypes from 'prop-types';
import localeAware from '../../HOC/localeAware';

class FormInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  render() {

    const { locale, translations, ...rest } = this.props;

    return (
      <div>
        <input
          {...rest}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

FormInput.defaultProps = {
  type: 'text',
  value: ''
};

FormInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  locale: PropTypes.object,
  translations: PropTypes.object
};

export default localeAware(FormInput);


import React from 'react';
import PropTypes from 'prop-types';
import color from 'color';
import themeAware from '../../HOC/themeAware';
import localeAware from '../../HOC/localeAware';
import i18nService from './../../services/I18nService';
import localeService from './../../services/LocaleService';
import template from '../../utils/template';

i18nService.registerTranslations({
  en: {
    'list': template`list`
  },
  sp: {
    'list': template`lista`
  }
});

const style = ({ vars }) => {
  return {
    list: {
      // color: color(vars.colors.secondaryColor || 'orange').lighten(0.5).hex()
      color: vars.dir === 'ltr' ? 'green' : 'red'
    }
  };
};

class List extends React.PureComponent {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: 0 */
      // console.log('rendering List component');
    }
    return (
      <div>
        {this.props.translations.list()}
        <ul className={this.props.classes.list}>
          {this.props.items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

List.defaultProps = {
  items: []
};

List.propTypes = {
  items: PropTypes.array,
  classes: PropTypes.object
};

export default themeAware({ style })(localeAware(List));

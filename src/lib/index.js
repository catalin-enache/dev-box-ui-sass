// Utils
import template from './utils/template';
import onScreenConsole from './utils/onScreenConsole';

// Services
import localeService from './services/LocaleService';
import i18nService from './services/I18nService';

// HOC
import localeAware from './HOC/localeAware';

// Components
import Hello from './components/Hello/Hello';
import List from './components/List/List';
import FormInput from './components/FormInput/FormInput';
import FormInputNumber from './components/FormInputNumber/FormInputNumber';


export {
  // Utils
  template,
  onScreenConsole,

  // Services
  localeService,
  i18nService,

  // HOC
  localeAware,

  // Components
  Hello,
  List,
  FormInput,
  FormInputNumber
};

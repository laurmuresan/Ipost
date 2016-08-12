import BaseModule from '../../base-module';
import intl from './stores/intl';
import * as getters from './getters';

class Intl extends BaseModule {
  static displayName = 'Intl';

  constructor() {
    super({ getters });
  }

  register(context) {
    context.registerStores({ intl });
  }
}

const INSTANCE = new Intl();
export default INSTANCE;

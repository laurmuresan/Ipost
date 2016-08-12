import BaseModule from '../../base-module';
import router from './stores/router';
import globalLeftNav from './stores/global-left-menu';
import * as actions from './actions';
import * as getters from './getters';

class Navigation extends BaseModule {
  static displayName = 'Navigation';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ router, globalLeftNav });
  }
}

export default new Navigation();

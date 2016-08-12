import BaseModule from '../../base-module';
import layout from './stores/layout';
import * as actions from './actions';
import * as getters from './getters';

class Layout extends BaseModule {
  static displayName = 'Layout';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ layout });
  }
}

export default new Layout();

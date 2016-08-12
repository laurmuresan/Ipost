import BaseModule from '../../base-module';
import notifications from './stores/notifications';
import * as actions from './actions';
import * as getters from './getters';

class Notifications extends BaseModule {
  static displayName = 'Notifications';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ notifications });
  }
}

export default new Notifications();

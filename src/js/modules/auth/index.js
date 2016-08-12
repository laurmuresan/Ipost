import auth from './stores/auth';
import BaseModule from '../../base-module';
import * as actions from './actions';
import * as getters from './getters';

class Auth extends BaseModule {
  static displayName = 'Auth';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ auth });
  }
}

export default new Auth();

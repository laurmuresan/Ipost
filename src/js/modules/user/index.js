import BaseModule from '../../base-module';
import user from './stores/user';
import * as actions from './actions';
import * as getters from './getters';


class User extends BaseModule {
  static displayName = 'User';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ user });
  }
}

export default new User();

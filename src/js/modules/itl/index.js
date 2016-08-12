import BaseModule from '../../base-module';
import itl from './stores/itl';
import * as actions from './actions';
import * as getters from './getters';

class Itl extends BaseModule {
  static displayName = 'Itl';

  constructor() {
    super({actions, getters});
  }

  register(context) {
    context.registerStores({
      itl
    });
  }
}

export default new Itl();

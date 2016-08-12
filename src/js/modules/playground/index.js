import BaseModule from '../../base-module';
import playground from './stores/playground';
import * as actions from './actions';
import * as getters from './getters';

class Playground extends BaseModule {
  static displayName = 'Playground';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ playground });
  }
}

export default new Playground();

import BaseModule from '../../base-module';
import * as actions from './actions';

class GenericManager extends BaseModule {
  static displayName = 'GenericManager';

  constructor() {
    super({ actions });
  }
}

export default new GenericManager();

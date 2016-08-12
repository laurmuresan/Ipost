import entityCache from './stores/entity-cache';
import entityOperations from './stores/entity-operations';
import BaseModule from '../../base-module';
import * as actions from './actions';
import * as getters from './getters';

class EntityCacheModule extends BaseModule {
  static displayName = 'EntityCache';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ entityCache, entityOperations });
  }
}

export default new EntityCacheModule();

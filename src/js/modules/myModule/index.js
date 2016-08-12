import BaseModule from '../../base-module';
import MyModuleStore from './stores/myModule';
import SearchingStore from './stores/searchStore';
import * as actions from './actions';
import * as getters from './getters';


class MyModule extends BaseModule {

  constructor() {
    super({actions, getters});
  }

  register(context) {
    context.registerStores({
      'store': MyModuleStore,
      'searching': SearchingStore
    });
  }
}

export default new MyModule();

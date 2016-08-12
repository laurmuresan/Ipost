import BaseModule from '../../base-module';
import templates from './stores/templates';
import templatesFolders from './stores/folders';
import selectedElementsTemplates from './stores/selected-elements';
import * as actions from './actions';
import * as getters from './getters';

class Templates extends BaseModule {
  static displayName = 'Templates';

  constructor() {
    super({ actions, getters });
  }

  register(context) {
    context.registerStores({ templates, templatesFolders, selectedElementsTemplates });
  }
}

export default new Templates();

import pagination from './stores/pagination';
import paginationModal from './stores/pagination-modal';
import BaseModule from '../../base-module';
import * as actions from './actions';
import * as getters from './getters';

class Pagination extends BaseModule {
  static displayName = 'Pagination';

  constructor() {
    super({actions, getters});
  }

  register(context) {
    context.registerStores({ pagination });
    context.registerStores({ paginationModal });
  }
}

export default new Pagination();

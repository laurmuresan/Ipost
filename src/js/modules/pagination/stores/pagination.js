import { Store, toImmutable } from 'nuclear-js';
import {
  CHANGE_PAGE_NR,
  RESET_PAGINATION,
} from '../action-types';
import { UPDATE_PAGINATION_INFO } from '../action-types';
import {
  GET_EMAILS_WITH_TEMPLATE_ID_SUCCESS,
} from '../../templates/action-types';

const initialPaginationData = toImmutable({
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  limit: 20,
});

class PaginationStore extends Store {
  getInitialState() {
    return initialPaginationData;
  }

  initialize() {
    this.on(CHANGE_PAGE_NR, changePageNr);
    this.on(RESET_PAGINATION, resetPagination);
    this.on(UPDATE_PAGINATION_INFO, updatePaginationData);
    this.on(GET_EMAILS_WITH_TEMPLATE_ID_SUCCESS, updatePaginationData);
  }
}

function changePageNr(prevState, pageNr) {
  return prevState.set('currentPage', pageNr);
}

function updatePaginationData(prevState, { meta = initialPaginationData } = {}) {
  return prevState.merge(toImmutable(meta));
}

function resetPagination(prevState) {
  return initialPaginationData;
}

const paginationStore = new PaginationStore();
export default paginationStore;

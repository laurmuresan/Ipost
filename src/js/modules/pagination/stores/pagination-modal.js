import { Store, toImmutable } from 'nuclear-js';
import {
  CHANGE_PAGE_NR_MODAL,
  RESET_PAGINATION_MODAL,
  UPDATE_PAGINATION_INFO_MODAL
} from '../action-types';

const initialPaginationData = toImmutable({
  modalPaginationInfo: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 20,
  },
});

class PaginationModalStore extends Store {
  getInitialState() {
    return initialPaginationData;
  }

  initialize() {
    this.on(CHANGE_PAGE_NR_MODAL, changePageNr);
    this.on(RESET_PAGINATION_MODAL, resetPagination);
    this.on(UPDATE_PAGINATION_INFO_MODAL, updatePaginationData);
  }
}

function changePageNr(prevState, pageNr) {
  return prevState.setIn(['modalPaginationInfo', 'currentPage'], pageNr);
}

function updatePaginationData(prevState, { meta } = {}) {
  return prevState.merge(toImmutable({modalPaginationInfo: meta}));
}

function resetPagination() {
  return initialPaginationData;
}

const paginationModalStore = new PaginationModalStore();
export default paginationModalStore;

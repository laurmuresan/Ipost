import context from '../../application-context';
import {
  CHANGE_PAGE_NR,
  RESET_PAGINATION,
  UPDATE_PAGINATION_INFO,
  CHANGE_PAGE_NR_MODAL,
  RESET_PAGINATION_MODAL,
  UPDATE_PAGINATION_INFO_MODAL,
} from './action-types';

export function changePageNr(payload) {
  context.dispatch(CHANGE_PAGE_NR, payload);
}

export function resetPagination(payload) {
  context.dispatch(RESET_PAGINATION, payload);
}

export function updatePaginationInfo(payload) {
  context.dispatch(UPDATE_PAGINATION_INFO, payload);
}

export function changePageNrModal(payload) {
  context.dispatch(CHANGE_PAGE_NR_MODAL, payload);
}

export function resetPaginationModal(payload) {
  context.dispatch(RESET_PAGINATION_MODAL, payload);
}

export function updatePaginationInfoModal(payload) {
  context.dispatch(UPDATE_PAGINATION_INFO_MODAL, payload);
}

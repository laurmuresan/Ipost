import context from '../../application-context';
import { browserHistory } from 'react-router';
import {
  COLLAPSE_TOGGLE,
  TOGGLE_LEFTSIDE_NAV_MODE,
  TOGGLE_RIGHT_MENU,
  SET_RIGHT_MENU_TAB,
  CHANGE_CREATE_EMAIL_NAVIGATION_LOCATION,
  CHANGE_PREVIEW_WIDTH,
  CHANGE_CREATE_PLAIN_TEXT_EMAIL_OPTIONS_TAB,
  TOGGLE_PANEL,
  TOGGLE_DELETE_FOLDER_MODAL,
  TEXT_CONTENT_OVERWRITE_MODAL,
  SPAM_CHECK_MODAL,
  TOGGLE_DELETE_MODAL,
  TOGGLE_PREVIEW_QUERY,
  UPDATE_MODAL_SIZE,
  SET_CLOSE_MODAL,
  SET_MODAL_TITLE,
  SET_CONFIRMATION_BUTTON,
  TEST_MAILING_MODAL,
  TRANSITION_TO_ROUTE,
  SHOW_MODAL_LOADING_SPINNER,
  CURRENT_CONTENT_VIEW,
  BEEFREE_SAVE_ACTION,
  SHOW_SPELLCHECK
} from './action-types';
//import { CANCEL_SEARCH } from '../../modules/folders/action-types';


export function updateTreeState(payload) {
  context.dispatch(COLLAPSE_TOGGLE, payload);
}

export function toggleSideNavs() {
  context.dispatch(TOGGLE_LEFTSIDE_NAV_MODE, null);
}

export function toggleRightMenu(payload) {
  context.dispatch(TOGGLE_RIGHT_MENU, payload);
}

export function setRightMenuTab(payload) {
  context.dispatch(SET_RIGHT_MENU_TAB, payload);
}

export function changeCreateEmailNavigationLocation(payload) {
  context.dispatch(CHANGE_CREATE_EMAIL_NAVIGATION_LOCATION, payload);
}

export function changePreviewWidth(payload) {
  context.dispatch(CHANGE_PREVIEW_WIDTH, payload);
}
export function changeCreatePlainTextEmailOptionsTab(payload) {
  context.dispatch(CHANGE_CREATE_PLAIN_TEXT_EMAIL_OPTIONS_TAB, payload);
}

export function showWindow(payload) {
  context.dispatch(TOGGLE_PANEL, payload);
}

export function toggleDeleteFolderModal(payload){
  context.dispatch(TOGGLE_DELETE_FOLDER_MODAL, payload);
}

export function toggleDeleteModal(payload){
  context.dispatch(TOGGLE_DELETE_MODAL, payload);
}

//export function cancelSearch(payload){
//  context.dispatch(CANCEL_SEARCH)
//}

export function showTextContentOverwriteModal(payload) {
  context.dispatch(TEXT_CONTENT_OVERWRITE_MODAL, payload);
}

export function showSpamCheckModal(payload) {
  context.dispatch(SPAM_CHECK_MODAL, payload);
}

export function togglePreviewQuery(payload) {
  context.dispatch(TOGGLE_PREVIEW_QUERY, payload);
}

export function updateModalSize(payload) {
  context.dispatch(UPDATE_MODAL_SIZE, payload);
}

export function setCloseModal(payload) {
  context.dispatch(SET_CLOSE_MODAL, payload);
}

export function setModalTitle(payload) {
  context.dispatch(SET_MODAL_TITLE, payload);
}

export function setConfirmationButton(payload) {
  context.dispatch(SET_CONFIRMATION_BUTTON, payload);
}

export function showTestMailingModal(payload) {
  context.dispatch(TEST_MAILING_MODAL, payload);
}

export function transitionToRoute(route) {
  browserHistory.push(route);
  context.dispatch(TRANSITION_TO_ROUTE, route);
}

export function showModalLoadingSpinner(show) {
  context.dispatch(SHOW_MODAL_LOADING_SPINNER, show);
}

export function changeContentView(payload) {
  context.dispatch(CURRENT_CONTENT_VIEW, payload);
}

export function updateBeefreeSaveAction(payload) {
  context.dispatch(BEEFREE_SAVE_ACTION, payload);
}
export function toggleSpellcheck() {
  context.dispatch(SHOW_SPELLCHECK, {});
}

import { Store, toImmutable } from 'nuclear-js';
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
  SET_CONFIRMATION_BUTTON,
  SET_MODAL_TITLE,
  TEST_MAILING_MODAL,
  SHOW_MODAL_LOADING_SPINNER,
  CURRENT_CONTENT_VIEW,
  BEEFREE_SAVE_ACTION,
  SHOW_SPELLCHECK
} from '../action-types';
import { CANCEL_SEARCH } from '../../../modules/folders/action-types';

const initialState = toImmutable({
  globalSideNav: {
    listOpenTreeNodes: [],
    full: true
  },
  rightMenu: false,
  rightMenuTab: 1,
  previewLayout: {
    id: 1,
    device: 'desktop',
    width: 'auto'
  },
  createEmailNavigationLocation: 'properties',
  createTemplateNavigationLocation: 'properties',
  createPlainTextEmailOptionsTab: 'content',
  windowIsOpen: {
    newFolder: false,
    filters: false,
    search: false,
    activeFilters: false
  },
  deleteFolderModal: false,
  textContentOverwriteModal: false,
  spamCheckModal: false,
  deleteModal: false,
  showPreviewQuery: false,
  modalSize: '', // small, sm, medium, large
  closeModal: false,
  modalButtons: [],
  modalTitle: '',
  showTestMailingModal: false,
  showModalLoadingSpinner: true,
  contentView: 'html',
  showSpellcheck: false
});

class LayoutStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(COLLAPSE_TOGGLE, updateTreeState);
    this.on(TOGGLE_LEFTSIDE_NAV_MODE, toggleSideNavs);
    this.on(TOGGLE_RIGHT_MENU, toggleRightMenu);
    this.on(SET_RIGHT_MENU_TAB, setRightMenuTab);
    this.on(CHANGE_CREATE_EMAIL_NAVIGATION_LOCATION, changeCreateEmailNavigationLocation);
    this.on(CHANGE_PREVIEW_WIDTH, changePreviewWidth);
    this.on(CHANGE_CREATE_PLAIN_TEXT_EMAIL_OPTIONS_TAB, changeCreatePlainTextEmailOptionsTab);
    this.on(TOGGLE_PANEL, showWindow);
    this.on(TOGGLE_DELETE_FOLDER_MODAL, toggleDeleteFolderModal);
    this.on(CANCEL_SEARCH, cancelSearch);
    this.on(TEXT_CONTENT_OVERWRITE_MODAL, showTextContentOverwriteModal);
    this.on(SPAM_CHECK_MODAL, showSpamCheckModal);
    this.on(TOGGLE_DELETE_MODAL, toggleDeleteModal);
    this.on(TOGGLE_PREVIEW_QUERY, togglePreviewQuery);
    this.on(UPDATE_MODAL_SIZE, changeModalSize);
    this.on(SET_CLOSE_MODAL, setCloseModal);
    this.on(SET_CONFIRMATION_BUTTON, setConfirmationButton);
    this.on(SET_MODAL_TITLE, setModalTitle);
    this.on(TEST_MAILING_MODAL, showTestMailingModal);
    this.on(SHOW_MODAL_LOADING_SPINNER, showModalLoadingSpinner);
    this.on(CURRENT_CONTENT_VIEW, setContentView);
    this.on(SHOW_SPELLCHECK, toggleSpellcheck);
    this.on(BEEFREE_SAVE_ACTION, beefreeSaveAction);
  }
}

export default new LayoutStore();

function updateTreeState(state, payload) {
  const { id, level } = payload; // { id: String, level: Number }
  const path = ['globalSideNav', 'listOpenTreeNodes'];
  let listOpenTreeNodes = state.getIn(path);
  const index = listOpenTreeNodes.indexOf(id);

  if (!id) {
    return state.setIn(path, toImmutable([]));
  }

  if (level > 0) {
    if (index > -1) {
      listOpenTreeNodes = listOpenTreeNodes.slice(0, index);
    } else {
      listOpenTreeNodes = listOpenTreeNodes.push(id);
    }

  } else {
    listOpenTreeNodes = listOpenTreeNodes.clear();
    listOpenTreeNodes = listOpenTreeNodes.push(id);
  }

  let nextState = state.setIn(path, listOpenTreeNodes);

  if (state.equals(nextState)) {
    return state;
  }

  return nextState;
}

function toggleSideNavs(state, payload) {
  const nextState = !state.getIn(['globalSideNav', 'full']);

  return state.setIn(['globalSideNav', 'full'], nextState);
}

function toggleRightMenu(state, payload) {
  const nextState = state.set('rightMenu', !payload);

  if (state.equals(nextState)) {
    return state;
  }

  return nextState;
}
function toggleSpellcheck(state) {
  const show = state.get('showSpellcheck');
  return state.set('showSpellcheck', !show);
}

function setRightMenuTab(state, payload) {
  return state.set('rightMenuTab', toImmutable(payload));
}

function changePreviewWidth(state, payload) {
  const nextState = state.set('previewLayout', toImmutable(payload));
  if (state.equals(nextState)) {
    return state;
  }

  return nextState;
}

function changeCreateEmailNavigationLocation(state, payload) {
  const nextState = state.set('createEmailNavigationLocation', payload);

  if (state.equals(nextState)){
    return state;
  }

  return nextState;
}

function changeCreatePlainTextEmailOptionsTab(state, payload){
  const nextState = state.set('createPlainTextEmailOptionsTab', payload);

  if (state.equals(nextState)) {
    return state;
  }

  return nextState;
}

function showWindow(state, payload) {
  const isOpen = state.getIn(['windowIsOpen', payload]);

  return state.setIn(['windowIsOpen', payload], !isOpen);
}

function toggleDeleteFolderModal(state, payload){
  const nextState = !state.get('deleteFolderModal');

  return state.set('deleteFolderModal', nextState);
}

function toggleDeleteModal(state){
  return state.set('deleteModal', !state.get('deleteModal'));
}

function cancelSearch(state, payload){
  return showWindow(state, 'search');
}

function showTextContentOverwriteModal(state, payload) {
  return state.set('textContentOverwriteModal', toImmutable(payload));
}

function showSpamCheckModal(state, payload) {
  return state.set('spamCheckModal', toImmutable(payload));
}

function togglePreviewQuery(state, payload) {
  const currentState = state.get('showPreviewQuery');
  return state.set('showPreviewQuery', !currentState);
}

function changeModalSize(state, payload) {
  return state.set('modalSize', toImmutable(payload));
}

function setCloseModal(state, payload) {
  return state.set('closeModal', toImmutable(payload));
}

function setConfirmationButton(state, payload) {
  return state.set('modalButtons', toImmutable(payload));
}

function setModalTitle(state, payload) {
  return state.set('modalTitle', toImmutable(payload));
}

function showTestMailingModal(state, payload) {
  return state.set('showTestMailingModal', toImmutable(payload));
}

function showModalLoadingSpinner(state, show) {
  return state.set('showModalLoadingSpinner', show);
}

function setContentView(state, payload) {
  const { view } = payload;
  return state.set('contentView', view);
}

function beefreeSaveAction(state, payload) {
  const { command } = payload;
  return state.set('beeFreeAction', command);
}

import { Store, toImmutable } from 'nuclear-js';
import {
  UPDATE_SEARCH_QUERY,
  UPDATE_MOVE_FOLDER_MODAL_SEARCH_QUERY,
  SEARCH_FOLDERS_SUCCESS,
  CANCEL_MOVE_FOLDER_MODAL_SEARCH
} from '../action-types';

const initialState = toImmutable({
  searchQuery: '',
  moveFolderModalSearchQuery: '',
  hasValidSearchInput: false,
  foundFoldersForMoveModal: []
});

class SearchFoldersAndEmails extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(UPDATE_SEARCH_QUERY, updateSearchQuery);
    this.on(UPDATE_MOVE_FOLDER_MODAL_SEARCH_QUERY, updateMoveFolderModalSearchQuery);
    this.on(SEARCH_FOLDERS_SUCCESS, updateFoundFoldersForMoveModal);
    this.on(CANCEL_MOVE_FOLDER_MODAL_SEARCH, cancelMoveFolderModalSearch);
  }
}

export default new SearchFoldersAndEmails();

function updateSearchQuery(state, payload){
  return state.set('searchQuery', toImmutable(payload));
}

function updateMoveFolderModalSearchQuery(state, payload){
  let nextState = state;

  nextState = nextState.set('hasValidSearchInput', payload.length > 0);
  nextState = nextState.set('moveFolderModalSearchQuery', payload);

  return nextState;
}

function cancelMoveFolderModalSearch(state, payload) {
  let nextState = state;

  nextState = nextState.set('hasValidSearchInput', false);
  nextState = nextState.set('moveFolderModalSearchQuery', '');
  nextState = nextState.set('foundFoldersForMoveModal', toImmutable([]));

  return nextState;
}

function updateFoundFoldersForMoveModal(state, payload) {
  const { folders } = payload;

  return state.set('foundFoldersForMoveModal', folders);
}

import { Store, toImmutable } from 'nuclear-js';
import {
  CHANGE_FOLDER,
  SET_MOVE_FOLDER_ID,
  MOVE_FOLDER_START,
  MOVE_FOLDER_SUCCESS,
  MOVE_FOLDER_FAILED,
  ADD_TO_SELECTED_FOLDERS,
  ADD_TO_SELECTED_TICKETS,
  SHOW_MOVE_MODAL,
  SHOW_GRID_FOLDERS_LEFT,
  CHECK_ALL,
  MOVE_SINGLE_FOLDER,
  MOVE_SINGLE_TICKET,
  GET_FOLDERS_TREE_SUCCESS,
  GET_FOLDERS_TREE_FAILED,
  GET_FOLDER_CONTENTS_START,
  GET_FOLDER_CONTENTS_SUCCESS,
  GET_FOLDER_CONTENTS_FAILED,
  SHOW_ADDITIONAL_BUTTONS,
  COLLAPSE_ALL_FOLDERS,
  APPLY_FILTERS_START,
  APPLY_FILTERS_SUCCESS,
  APPLY_FILTERS_FAILED,
  SEARCH_EMAILS_AND_FOLDERS_START,
  SEARCH_EMAILS_AND_FOLDERS_SUCCESS,
  SEARCH_EMAILS_AND_FOLDERS_FAIL,
  RENAME_FOLDER_SUCCESS,
  SHOW_BOTTOM_BREADCRUMBS,
  SET_GRID_VIEW_TYPE,
  TOGGLE_FOLDER_RENAME_STATE,
  SET_SELECTED_FOLDER_ID_FROM_LIST,
  SET_SELECTED_FOLDER_ID_FROM_TREE,
  SET_OPEN_IN_FOLDER_TREE
} from '../action-types';

const initialState = toImmutable({
  folder: null,
  moveTo: {
    id: -1,
    label: 'Emails',
    focus: 0
  },
  folders: [
    {
      id: 0,
      name: 'Emails',
      collapsed: false,
      parentIdPath: [],
      selected: false,
      folders: []
    }
  ],
  openFolderTreeList: [0],
  isFolderInRenameState: false,
  newFolder: {},
  selectedFolderIdFromList: -1,
  selectedFolderIdFromTree: -1
});

class FoldersStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(CHANGE_FOLDER, updateCurrentFolder);
    this.on(SET_MOVE_FOLDER_ID, setMovetoFolder);
    this.on(MOVE_FOLDER_START, moveFolderStart);
    this.on(MOVE_FOLDER_SUCCESS, moveFolderSuccess);
    this.on(MOVE_FOLDER_FAILED, moveFolderFailed);
    this.on(ADD_TO_SELECTED_FOLDERS, addToSelectedFolders);
    this.on(ADD_TO_SELECTED_TICKETS, addToSelectedTickets);
    this.on(SHOW_MOVE_MODAL, showMoveModal);
    this.on(SHOW_GRID_FOLDERS_LEFT, showGridFoldersLeft);
    this.on(CHECK_ALL, checkAll);
    this.on(MOVE_SINGLE_FOLDER, moveSingleFolder);
    this.on(MOVE_SINGLE_TICKET, moveSingleTicket);
    this.on(GET_FOLDERS_TREE_SUCCESS, getFoldersTreeSuccess);
    this.on(GET_FOLDERS_TREE_FAILED, getFoldersTreeFailed);
    this.on(GET_FOLDER_CONTENTS_START, getFolderStart);
    this.on(GET_FOLDER_CONTENTS_SUCCESS, getFolderSuccess);
    this.on(GET_FOLDER_CONTENTS_FAILED, getFolderFailed);

    this.on(APPLY_FILTERS_START, applyFiltersStart);
    this.on(APPLY_FILTERS_SUCCESS, applyFiltersSuccess);
    this.on(APPLY_FILTERS_FAILED, applyFiltersFailed);

    this.on(SHOW_ADDITIONAL_BUTTONS, showAdditionalButtons);
    this.on(COLLAPSE_ALL_FOLDERS, collapseAllFolders);

    this.on(SEARCH_EMAILS_AND_FOLDERS_START, applySearchStart);
    this.on(SEARCH_EMAILS_AND_FOLDERS_SUCCESS, applySearch);
    this.on(SEARCH_EMAILS_AND_FOLDERS_FAIL, applySearchFailed);

    this.on(RENAME_FOLDER_SUCCESS, renameFolder);
    this.on(SHOW_BOTTOM_BREADCRUMBS, showBottomBreadcrumbs);
    this.on(SET_GRID_VIEW_TYPE, setGridViewType);
    this.on(TOGGLE_FOLDER_RENAME_STATE, toggleFolderRenameState);

    this.on(SET_SELECTED_FOLDER_ID_FROM_LIST, setSelectedFolderIdFromList);
    this.on(SET_SELECTED_FOLDER_ID_FROM_TREE, setSelectedFolderIdFromTree);
    this.on(SET_OPEN_IN_FOLDER_TREE, setOpenInFolderTree);
  }
}

export default new FoldersStore();

function renameFolder(state, payload) {
  let newFolder;

  if (!state.get('newFolder')) {
    newFolder = {};
  } else {
    newFolder = state.get('newFolder').toJS();
  }

  newFolder[payload.id] = {
    name: payload.name
  };

  const nextState = state.merge(state, toImmutable({newFolder: newFolder}));

  if (nextState.size && !nextState.equals(state)) {
    return nextState;
  }

  return state;
}

function updateCurrentFolder(state, payload) {
  return state.set('folder', toImmutable(payload));
}

function setMovetoFolder(state, payload) {
  const nextState = state.set('moveTo', toImmutable({
    id: payload.id,
    label: payload.name,
    focus: ((state.get('moveTo').toJS().focus !== undefined) ? ++state.get('moveTo').toJS().focus : 0)
  }));

  if (nextState.size && !nextState.equals(state)) {
    return nextState;
  }

  return state;
}

function moveSingleFolder(state, payload) {
  return state.setIn(['moveItems', 'moveSingleFolderId'], toImmutable(payload));
}

function moveSingleTicket(state, payload) {
  return state.setIn(['moveItems', 'moveSingleTicketId'], toImmutable(payload));
}

function moveFolderStart(state, payload) {
  return state.set('showLoader', true);
}

function moveFolderSuccess(state, payload) {
  let selectedFolder = state.get('folder');
  let subFolders = selectedFolder.get('folders');
  let emails = selectedFolder.get('tickets');

  for (let i = 0; i < payload.data.folders.length; i++) {
    for (let j = 0; j < subFolders.count(); j++){
        let id = subFolders.get(j).get('id');
        if (id === payload.data.folders[i].toString()) {
          subFolders = subFolders.delete(j);
        break;
      }
    }
  }

  for (let i = 0; i < payload.data.emails.length; i++) {
    for (let j = 0; j < emails.count(); j++){
      let id = emails.get(j).get('id');
      if (id === payload.data.emails[i].toString()) {
        emails = emails.delete(j);
        break;
      }
    }
  }

  selectedFolder = selectedFolder.set('folders', subFolders);
  selectedFolder = selectedFolder.set('tickets', emails);
  state = state.set('folder', selectedFolder);
  return state.set('showLoader', false);
}

function moveFolderFailed(state, payload) {
  return state.set('showLoader', false);
}

function addToSelectedFolders(state, payload) {
  let folders = state.getIn(['moveItems', 'selectedFolders']);

  if (isNaN(payload.id) || (typeof (payload.id) !== 'string' && typeof (payload.id) !== 'number')) {
      //add / remove all folders and emails
      if (payload.checked) {
        return state.setIn(['moveItems', 'selectedFolders'], toImmutable(payload.id));
      } else {
        return state.setIn(['moveItems', 'selectedFolders'], toImmutable([]));
      }
  } else {
      //add / remove one email/folder at a time
  if (payload.checked && folders.indexOf(payload.id) === -1) {
    return state.setIn(['moveItems', 'selectedFolders'], folders.push(payload.id));
  } else {
    if (payload.checked === false) {
      for (let i = 0; i < folders.count(); i++) {
        if (parseInt(folders.get(i)) === parseInt(payload.id)) {
            state = state.setIn(['moveItems', 'selectedFolders'], folders.delete(i));
            if (state.getIn(['moveItems', 'selectedTickets']).size === 0 && state.getIn(['moveItems', 'selectedFolders']).size === 0) {
              state = state.set('showAdditionalButtons', false);
            }
            return state;
          }
        }
      }
    }
  }
  return state;
}

function addToSelectedTickets(state, payload) {
  let tickets = state.getIn(['moveItems', 'selectedTickets']);
  if (isNaN(payload.id) || (typeof (payload.id) !== 'string' && typeof (payload.id) !== 'number')) {
    //add / remove all folders and emails
    if (payload.checked) {
      return state.setIn(['moveItems', 'selectedTickets'], toImmutable(payload.id));
    } else {
      return state.setIn(['moveItems', 'selectedTickets'], toImmutable([]));
    }
  } else {
  if (payload.checked && tickets.indexOf(payload.id) === -1) {
    return state.setIn(['moveItems', 'selectedTickets'], tickets.push(payload.id));
  } else {
    if (payload.checked === false) {
      for (let i = 0; i < tickets.count(); i++) {
        if (tickets.get(i) === payload.id) {
            state = state.setIn(['moveItems', 'selectedTickets'], tickets.delete(i));
            if (state.getIn(['moveItems', 'selectedTickets']).size === 0 && state.getIn(['moveItems', 'selectedFolders']).size === 0) {
              state = state.set('showAdditionalButtons', false);
        }
        return state;
      }
    }
  }
    }
  }
  return state;
}

function showMoveModal(state, payload) {
  return state.set('showMoveModal', toImmutable(payload));
}

function showGridFoldersLeft(state, payload) {
  return state.set('showGridFoldersLeft', toImmutable(payload));
}

function checkAll(state, payload) {
  return state.set('checkAll', toImmutable(payload));
}

function getFoldersTreeSuccess(state, payload) {
  /*const { nodes } = payload.data;
  return state.setIn(['folders', 'children'], toImmutable(nodes));*/
  const { nodes } = payload.data;
  return state.setIn(['folders'], toImmutable(nodes));
}

function getFoldersTreeFailed(state, payload) {
  return state;
}

function getFolderStart(state, payload) {
  return state.set('showLoader', true);
}

function getFolderSuccess(currentState, payload) {
  const selectedFolder = payload.folder;
  const { items, folders } = payload.content.data;

  selectedFolder.folders = folders;
  selectedFolder.tickets = items;

  return currentState.withMutations((state) => {
    return (
      state
        .set('checkAll', toImmutable(false))
        .setIn(['moveItems', 'selectedFolders'], toImmutable([]))
        .setIn(['moveItems', 'selectedTickets'], toImmutable([]))
        .setIn(['moveItems', 'moveSingleFolderId'], toImmutable(-1))
        .setIn(['moveItems', 'moveSingleTicketId'], toImmutable(-1))
        .set('showLoader', false)
        .set('gridViewType', toImmutable('folder'))
        .set('folder', toImmutable(selectedFolder))
    );
  });
}

function getFolderFailed(state, payload) {
  state = state.set('gridViewType', toImmutable('folder'));
  return state.set('showLoader', false);
}

function applyFiltersStart(state, payload) {
  return state.set('showLoader', true);
}

function applyFiltersFailed(state, payload) {
  state = state.set('gridViewType', toImmutable('filter'));
  return state.set('showLoader', false);
}

function applyFiltersSuccess(state, payload) {
  let selectedFolder = state.get('folder');
  selectedFolder = selectedFolder.set('folders', toImmutable(payload.folders));
  selectedFolder = selectedFolder.set('tickets', toImmutable(payload.emails));
  state = state.set('checkAll', toImmutable(false));
  state = state.setIn(['moveItems', 'selectedFolders'], toImmutable([]));
  state = state.setIn(['moveItems', 'selectedTickets'], toImmutable([]));
  state = state.setIn(['moveItems', 'moveSingleFolderId'], toImmutable(-1));
  state = state.setIn(['moveItems', 'moveSingleTicketId'], toImmutable(-1));
  state = state.set('showLoader', false);
  state = state.set('gridViewType', toImmutable('filter'));
  return state.set('folder', toImmutable(selectedFolder));
}

function showAdditionalButtons(state, payload) {
  return state.set('showAdditionalButtons', payload);
}

function collapseAllFolders(state, collapse) {
  let allFolders = state.get('folders').toJS();
  const find = (folders, c) => {
    for (let i = 0; i < folders.length; i++) {
      folders[i].collapsed = collapse;

      if (folders[i].folders.length > 0) {
        find(folders[i].folders, collapse);
      }
    }
  };

  find(allFolders, collapse);

  return state.set('folders', toImmutable(allFolders));
}

function applySearchStart(state, payload){
  return state.set('showLoader', true);
}

function applySearch(state, payload) {
  let selectedFolder = state.get('folder');

  selectedFolder = selectedFolder.set('folders', toImmutable(payload.folders));
  selectedFolder = selectedFolder.set('tickets', toImmutable(payload.emails));
  state = state.set('checkAll', toImmutable(false));
  state = state.setIn(['moveItems', 'selectedFolders'], toImmutable([]));
  state = state.setIn(['moveItems', 'selectedTickets'], toImmutable([]));
  state = state.setIn(['moveItems', 'moveSingleFolderId'], toImmutable(-1));
  state = state.setIn(['moveItems', 'moveSingleTicketId'], toImmutable(-1));
  state = state.set('showLoader', false);
  state = state.set('gridViewType', toImmutable('search'));
  return state.set('folder', toImmutable(selectedFolder));
}

function applySearchFailed(state, payload) {
  state = state.set('gridViewType', toImmutable('search'));
  return state.set('showLoader', false);
}

function showBottomBreadcrumbs(state, payload) {
  return state.set('showBottomBreadcrumbs', payload);
}

function setGridViewType(state, gridViewType) {
  //type = folder / search / filter
  return state.set('gridViewType', toImmutable(gridViewType));
}

function toggleFolderRenameState(state, payload){
  let nextState = !state.get('isFolderInRenameState');
  return state.set('isFolderInRenameState', nextState);
}

function setSelectedFolderIdFromList(state, payload) {
  const { id } = payload;

  return state.set('selectedFolderIdFromList', id.toString());
}

function setSelectedFolderIdFromTree(state, payload) {
  const { id } = payload;

  return state.set('selectedFolderIdFromTree', id.toString());
}

function setOpenInFolderTree(state, payload) {
  const idList = state.get('openFolderTreeList');

  let newList;
  const position = idList.indexOf(payload);

  if (position === -1) {
    newList = idList.push(payload);
  } else {
    newList = idList.delete(position);
  }

  return state.set('openFolderTreeList', newList);
}

import { Store, toImmutable, Immutable } from 'nuclear-js';
import {
  COLLAPSE_ALL,
  COLLAPSE_FOLDER,
  GET_TEMPLATES_FOLDERS_SUCCESS,
  GET_TEMPLATES_FOLDERS_FAIL,
  SELECT_TREE_ELEMENT,
  SET_MOVE_FOLDER_ID_TEMPLATES,

  RENAME_TEMPLATE_FOLDER_SUCCESS,
  TOGGLE_RENAME_INPUT,
  SET_TEMPLATE_FOLDER_NAME,
  VALIDATE_FOLDER_NAME,

  RESET_NEW_TEMPLATE_FOLDER,

  SHOW_MOVE_MODAL_TEMPLATES,
  SELECT_LIST_ELEMENT,
  RESET_MOVE_TO,

  SHOW_DELETE_MODAL_TEMPLATES,
  GET_SUBFOLDERS_NUMBER,
  GET_SELECTED_TEMPLATE_FOLDERS_DELETION,
  GET_TEMPLATE_SINGLE_DELETION_SELECTION,
  RESET_TEMPLATE_DELETION_SELECTIONS,

  SET_CHANGE_TEMPLATE,
  GET_FULL_TEMPLATES_FOLDERS_SUCCESS,

} from '../action-types';

const immutableSet = Immutable.Set;
let foundFolders = toImmutable([]);
let folderIds = toImmutable([]);

const initialState = toImmutable({
  allCollapsed: false,
  showMoveModal: false,
  showDeleteModal: false,
  expandedTreeItems: immutableSet([0]),
  folder: {
    checked: false,
    itemId: 0,
    itemLabel: 'Templates'
  },
  moveTo: {
    id: 0,
    label: 'Templates',
    focus: 0
  },
  folders: [
    {
      id: 0,
      name: 'Templates',
      collapsed: true,
      parentIdPath: [],
      selected: false,
      folders: []
    }
  ],
  selectedFolderIdFromList: {
    id: -1,
    parentId: -1
  },
  selectedTemplateIdFromList: {
    id: -1,
    parentId: -1
  },
  newFolder: {},
  isFolderInRenameState: '',
  newFolderName: '',
  newFolderValidation: {
    tooFewCharacters: false,
    tooManyCharacters: false,
    noCharacters: false,
    validationMessages: {
      tooFew: 'The folder\'s name must contain at least 3 characters.',
      tooMany: 'The folder\'s name can have maximum 50 characters.',
      none: 'The folder\'s name cannot be empty.'
    }
  },
  selectedFoldersForDeletion:[],
  singleDeletionSelection: [],
  newTemplateId: '',
  fullTree: [
    {
      id: 0,
      name: 'Templates',
      collapsed: false,
      parentIdPath: [],
      selected: false,
      folders: [],
      templates: []
    }
  ],
});

class TemplatesFoldersStore extends Store {
  getInitialState(){
    return initialState;
  }

  initialize() {
    this.on(COLLAPSE_ALL, collapseAll);
    this.on(COLLAPSE_FOLDER, collapseOne);

    this.on(RESET_MOVE_TO, resetMoveTo);
    this.on(SET_MOVE_FOLDER_ID_TEMPLATES, setMovetoFolder);
    this.on(SHOW_MOVE_MODAL_TEMPLATES, showMoveModal);

    this.on(GET_TEMPLATES_FOLDERS_SUCCESS, getFoldersSuccess);
    this.on(GET_TEMPLATES_FOLDERS_FAIL, getFoldersFailed);

    this.on(SELECT_TREE_ELEMENT, selectTreeElement);
    this.on(SELECT_LIST_ELEMENT, selectListElement);

    this.on(RESET_NEW_TEMPLATE_FOLDER, resetNewFolder);

    this.on(RENAME_TEMPLATE_FOLDER_SUCCESS, renameFolder);
    this.on(TOGGLE_RENAME_INPUT, toggleFolderRenameState);
    this.on(VALIDATE_FOLDER_NAME, validateNewFolderName);
    this.on(SET_TEMPLATE_FOLDER_NAME, setNewFolderNameInStore);

    this.on(SHOW_DELETE_MODAL_TEMPLATES, showDeleteModal);
    this.on(GET_SUBFOLDERS_NUMBER, countSubFoldersToBeDeleted);
    this.on(RESET_TEMPLATE_DELETION_SELECTIONS, resetDeletionSelections);
    this.on(GET_TEMPLATE_SINGLE_DELETION_SELECTION, setSingleDeletionSelection);
    this.on(GET_SELECTED_TEMPLATE_FOLDERS_DELETION, getSelectedFoldersForDeletion);
    this.on(SET_CHANGE_TEMPLATE, setNewTemplateIdOnEmail);
    this.on(GET_SELECTED_TEMPLATE_FOLDERS_DELETION, getSelectedFoldersForDeletion);
    this.on(GET_FULL_TEMPLATES_FOLDERS_SUCCESS, getFullTree);

  }
}

export default new TemplatesFoldersStore();

function resetNewFolder(state) {
 const nextState = state.set('newFolderName', toImmutable(''));

  return nextState.set('newFolderValidation',
    toImmutable({
      tooFewCharacters: false,
        tooManyCharacters: false,
        noCharacters: false,
        validationMessages: {
        tooFew: 'The folder\'s name must contain at least 3 characters.',
          tooMany: 'The folder\'s name can have maximum 50 characters.',
          none: 'The folder\'s name cannot be empty.'
      }
    })
  );
}

function getFoldersSuccess(state, payload) {
  const { folders } = payload.data;
  return state.setIn(['folders', 0, 'folders'], toImmutable(folders));
}

function getFoldersFailed(state) {
  return state;
}
function resetMoveTo(state) {
  return state.set('moveTo', toImmutable({
      id: 0,
      label: 'Templates',
      focus: 0
    })
  );
}

function getFullTree(state, payload) {
  return state.setIn(['fullTree', 0], toImmutable(payload.data));
}

function setNewTemplateIdOnEmail(state, payload) {
  return state.set('newTemplateId', payload);
}

function collapseAll(state) {
  let allFolders = state.get('folders');
  const allCollapsed = !state.get('allCollapsed');


  let goThroughAll = (folders, collapse) => {
    let children = null;

    if (folders.size) {
      folders = folders.map((folder) => {
        folder = folder.set('collapsed', collapse);
        children = folder.get('folders');

        if (children.size) {
          goThroughAll(children, collapse);
        }

        return folder;
      });
    }
    return folders;
  };

  let folders = goThroughAll(allFolders, allCollapsed);

  if (allFolders.size) {
    return state
      .set('folders', folders)
      .set('allCollapsed', allCollapsed);
  }

  return state;
}

function collapseOne(prevState, payload) {
  const path = ['expandedTreeItems'];

  let expandedTreeItems = prevState.getIn(path);
  let nextState;

  const id = Number(payload.get('id'));
  const isInSet = expandedTreeItems.contains(id);

  if (isInSet) {
    nextState = prevState.setIn(path, expandedTreeItems.remove(id));
  } else {
    nextState = prevState.setIn(path, expandedTreeItems.add(id));
  }

  if (prevState.equals(nextState)) {
    return prevState;
  }

  return nextState;
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

function toggleFolderRenameState(state, payload) {
  let nextState = state.set('isFolderInRenameState', payload);
  return nextState;
}

function setNewFolderNameInStore(state, payload) {
  return state.set('newFolderName', toImmutable(payload));
}

function validateNewFolderName(state, payload) {
  const newFolderName = state.get('newFolderName');
  let nextState = initialState.get('newFolderValidation');

  nextState = nextState.set('newFolderName', newFolderName);

  if (newFolderName.length === 0){
    nextState = nextState.set('noCharacters', true);
  }
  if (newFolderName.length < 3){
    nextState = nextState.set('tooFewCharacters', true);
  }
  if (newFolderName.length > 50){
    nextState = nextState.set('tooManyCharacters', true);
  }

  return state.set('newFolderValidation', nextState);
}


function selectTreeElement(state, payload) {
  return state.set('folder', toImmutable(payload));
}

function selectListElement(state, payload) {

  if (payload.type === 'folder') {
    return state.set('selectedFolderIdFromList', toImmutable({id: payload.id, parentId: payload.parentId}));
  } else {
    return state.set('selectedTemplateIdFromList', toImmutable({id: payload.id, parentId: payload.parentId}));
  }
}

function showMoveModal(state, payload) {
  return state.set('showMoveModal', toImmutable(payload));
}

function showDeleteModal(state, payload) {
  return state.set('showDeleteModal', toImmutable(payload));
}

function countSubFoldersToBeDeleted(state, folder) {
  //const subfolders = folder.get('folders');
  return state;
}

function getSelectedFoldersForDeletion(state, payload){
  const { rootFolder, selectedFolders } = payload;

  foundFolders = toImmutable([]);
  folderIds = selectedFolders;
  findFolders(rootFolder);

  return state.set('selectedFoldersForDeletion', foundFolders);
}

function setSingleDeletionSelection(state, payload){

  if (!payload) {
    return state.set('singleDeletionSelection', toImmutable([]));
  }

  return state.set('singleDeletionSelection', toImmutable(payload));
}

function resetDeletionSelections(state, payload){
  return initialState;
}

function findFolders(rootFolder) {
  for (let i = 0; i < folderIds.size; i++) {
    if (rootFolder.get('id') === folderIds.get(i)) {
      foundFolders = foundFolders.push(rootFolder);
      folderIds = folderIds.delete(i);
      if (folderIds.size === 0){
        return;
      }
    }
  }
  if (rootFolder.get('folders').size){
    for (let i = 0; i < rootFolder.get('folders').size; i++){
      findFolders(rootFolder.get('folders').get(i), folderIds, foundFolders);
    }
  }
}



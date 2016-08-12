import { Store, toImmutable } from 'nuclear-js';
import context from '../../../application-context';
import {
  GET_SELECTED_FOLDERS_FOR_DELETION,
  GET_SINGLE_DELETION_SELECTION,
  RESET_DELETION_SELECTIONS,
  GET_SELECTED_EMAILS_FOR_DELETION,
  SET_SINGLE_EMAIL_SELECTION,
  RESET_SINGLE_EMAIL_SELECTION
} from '../action-types';

const initialState = toImmutable({
  selectedFoldersForDeletion:[],
  singleDeletionSelection: [],
  selectedEmailsForDeletion: [],
  singleEmailSelection: {
    id: '-1',
    name: ''
  }
});

class DeleteFolderStore extends Store{
  getInitialState(){
    return initialState;
  }

  initialize(){
    this.on(GET_SELECTED_FOLDERS_FOR_DELETION, getSelectedFoldersForDeletion);
    this.on(GET_SINGLE_DELETION_SELECTION, setSingleDeletionSelection);
    this.on(RESET_DELETION_SELECTIONS, resetDeletionSelections);
    this.on(GET_SELECTED_EMAILS_FOR_DELETION, getSelectedEmailsForDeletion);
    this.on(SET_SINGLE_EMAIL_SELECTION, setSingleEmailSelection);
    this.on(RESET_SINGLE_EMAIL_SELECTION, resetSingleEmailSelection);
  }
}

export default new DeleteFolderStore();

let foundFolders = toImmutable([]);
let folderIds = toImmutable([]);

function getSelectedFoldersForDeletion(state, payload){
  const { rootFolder, selectedFolders } = payload;

  foundFolders = toImmutable([]);
  //Only works with locally mocked IDs, until real data is supplied
  //folderIds = toImmutable([1,3,2]);
  folderIds = selectedFolders;
  findFolders(rootFolder);

  return state.set('selectedFoldersForDeletion', foundFolders);
}

function getSelectedEmailsForDeletion(state, payload) {
  const { modules } = context;
  const selectedEmailIds = context.evaluate(modules.folders.getters.moveItems).get('selectedTickets');
  const emailsInRootFolder = context.evaluate(modules.folders.getters.folder).get('tickets');
  let foundEmails = toImmutable([]);

  for (let i = 0; i < emailsInRootFolder.size; i++) {
    for (let j = 0; j < selectedEmailIds.size; j++) {
      if (emailsInRootFolder.get(i).get('id') === selectedEmailIds.get(j)) {
        foundEmails = foundEmails.push(emailsInRootFolder.get(i));
      }
    }
  }

  return state.set('selectedEmailsForDeletion', foundEmails);
}

function setSingleDeletionSelection(state, payload){
  const { rootFolder, selectedFolders } = payload;

  if (!payload){ //reset single selection
    return state.set('singleDeletionSelection', toImmutable([]));
  }

  foundFolders = toImmutable([]);
  //Only works with locally mocked IDs, until real data is supplied
  //folderIds = toImmutable([1,3,2]);
  folderIds = selectedFolders;
  findFolders(rootFolder);

  return state.set('singleDeletionSelection', foundFolders);
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

function setSingleEmailSelection(state, payload) {
  const { id, name } = payload;

  return state.set('singleEmailSelection', toImmutable({id, name}));
}

function resetSingleEmailSelection(state, payload) {
  return state.set('singleEmailSelection', toImmutable({ id: '-1', name: '' }));
}

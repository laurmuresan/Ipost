import { Store, toImmutable } from 'nuclear-js';
import {
  SET_NEW_FOLDER_NAME_IN_STORE,
  VALIDATE_NEW_FOLDER_NAME,
  CREATE_FOLDER_SUCCESS,
  RESET_NEW_FOLDER
  } from '../action-types';

const initialState = toImmutable({
  newFolderName: '',
  newFolderValidation: {
    tooFewCharacters: false,
    tooManyCharacters: false,
    noCharacters: false,
    duplicate: false,
    validationMessages: {
      tooFew: 'The folder\'s name must contain at least 3 characters.',
      tooMany: 'The folder\'s name can have maximum 50 characters.',
      none: 'The folder\'s name cannot be empty.',
      duplicate: 'This folder name already exists'
    }
  }
});

class CreateNewFolder extends Store{
  getInitialState(){
    return initialState;
  }

  initialize(){
    this.on(SET_NEW_FOLDER_NAME_IN_STORE, setNewFolderNameInStore);
    this.on(VALIDATE_NEW_FOLDER_NAME, validateNewFolderName);
    this.on(CREATE_FOLDER_SUCCESS, resetState);
    this.on(RESET_NEW_FOLDER, resetState);
  }
}

export default new CreateNewFolder();

function setNewFolderNameInStore(state, payload){
  return state.set('newFolderName', toImmutable(payload));
}

function validateNewFolderName(state, payload){
  const newFolderName = state.get('newFolderName');
  let nextState = initialState;

  nextState = nextState.set('newFolderName', newFolderName);

  if (newFolderName.length === 0){
    nextState = nextState.setIn(['newFolderValidation', 'noCharacters'], true);
  }
  if (newFolderName.length < 3){
    nextState = nextState.setIn(['newFolderValidation', 'tooFewCharacters'], true);
  }
  if (newFolderName.length > 50){
    nextState = nextState.setIn(['newFolderValidation', 'tooManyCharacters'], true);
  }
  return nextState;
}

function resetState(state, payload){
  return initialState;
}


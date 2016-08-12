import {Store, toImmutable} from 'nuclear-js';
import {
  RESET_ITL,
  CHANGE_PERSONALIZE_TAGS_PANEL_PROPERTIES,
  GET_ITL_MACROS_SUCCESS,
  SET_CKEDITOR_MODE
} from '../action-types';

const initialState = toImmutable({
  // itl tags modal
  fieldWithTags: '',
  tagText: '',
  filteredTagList: [],
  hasSearchQuery: false,

  // list of macros
  macros: {},

  // CK Editor state: wysywyg or html
  ckEditorMode: ''
});


class ItlStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(RESET_ITL, resetITL);
    this.on(CHANGE_PERSONALIZE_TAGS_PANEL_PROPERTIES, changeProperties);
    this.on(GET_ITL_MACROS_SUCCESS, setItlMacros);
    this.on(SET_CKEDITOR_MODE, setCKEditorMode);
  }
}

export default new ItlStore();

function resetITL() {
  return initialState;
}

function changeProperties(state, payload) {
  return state.merge(state, toImmutable(payload));
}

function setItlMacros(state, payload) {
  let tempMacroArray = [];
  for (let i = 0; i < payload.macros.length; i++) {
    if (payload.macros[i].itlMacro) {
      tempMacroArray.push(payload.macros[i].itlMacro);
    }
  }

  return state.set('macros', toImmutable(tempMacroArray));
}

function setCKEditorMode(state, payload) {
  return state.set('ckEditorMode', payload.ckEditorMode);
}

import { Store, toImmutable } from 'nuclear-js';
import {
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATE_FOLDER_CONTENT_SUCCESS,
  GET_TEMPLATE_FOLDER_CONTENT_FAIL,

  SELECT_ALL_TEMPLATES_ELEMENTS,
  SELECT_ELEMENT,
  UPDATE_TEMPLATES_SORT_METHOD,

  SET_TEMPLATE_SEARCH_TERM,
  SEARCH_TEMPLATES_SUCCESS,

  RESET_TEMPLATE_SELECTIONS,
  GET_EMAILS_WITH_TEMPLATE_ID_SUCCESS,

  APPLY_TEMPLATES_FILTERS_SUCCESS
} from '../action-types';

class SelectedElementsStore extends Store {
  getInitialState() {
    return toImmutable({
      folderTemplatesContent: {
        folders: [],
        items: []
      },
      selectedElements: {
        allSelected: false,
        selectAllFlag: false,
        pageSelectionsNr: 0
      },
      selectedTemplates: [],
      selectedFolders: [],
      currentSortMethod: {
        sortBy: '',
        sortOrder: ''
      },
      searchQuery: '',
      emailsTemplates: {}
    });
  }

  initialize() {
    this.on(GET_TEMPLATES_SUCCESS, getTemplates);
    this.on(SELECT_ALL_TEMPLATES_ELEMENTS, selectAllElemets);
    this.on(SELECT_ELEMENT, selectElement);
    this.on(GET_TEMPLATE_FOLDER_CONTENT_SUCCESS, getFolderContents);
    this.on(GET_TEMPLATE_FOLDER_CONTENT_FAIL, getFolderContentsFail);
    this.on(UPDATE_TEMPLATES_SORT_METHOD, updateSortMethod);

    this.on(SET_TEMPLATE_SEARCH_TERM, setSearchTerm);
    this.on(SEARCH_TEMPLATES_SUCCESS, setSearchSuccess);

    this.on(RESET_TEMPLATE_SELECTIONS, resetSelections);

    this.on(APPLY_TEMPLATES_FILTERS_SUCCESS, applyFiltersSuccess);
    this.on(GET_EMAILS_WITH_TEMPLATE_ID_SUCCESS, setTemplateEmails);
  }
}

export default new SelectedElementsStore();

function getTemplates(prevState, payload) {
  const nextState = toImmutable({folderTemplatesContent: payload});
  return prevState.merge(nextState);
}

function selectElement(prevState, { checked, itemId, type }) {
  let nextStateTemplates = prevState.get('selectedTemplates');
  let nextStateFolders = prevState.get('selectedFolders');
  let position;
  if (type === 'folder') {
    position = nextStateFolders.indexOf(itemId);
    nextStateFolders = position > -1 ?
     nextStateFolders.delete(position) : nextStateFolders.push(itemId);
  } else {
    position = nextStateTemplates.indexOf(itemId);
    nextStateTemplates = position > -1 ?
      nextStateTemplates.delete(position) : nextStateTemplates.push(itemId);
  }

  let nextState = prevState.set('selectedTemplates', nextStateTemplates).set('selectedFolders', nextStateFolders);
  // For knowing when to check the 'select All' checkbox on the current page.
  const currentPageSelectionsNr = nextState.get('selectedTemplates').size +
    nextState.get('selectedFolders').size;

  nextState = nextState.updateIn(['selectedElements', 'pageSelectionsNr'], () => currentPageSelectionsNr);

  const folders = nextState.getIn(['folderTemplatesContent', 'folders']);
  const templates = nextState.getIn(['folderTemplatesContent', 'items']);

  const totalItemsNumber = folders.size + templates.size;

  // If all the elements are checked, mark on the 'select All' input also.
  if (currentPageSelectionsNr === totalItemsNumber) {
    nextState = nextState.updateIn(['selectedElements', 'allSelected'], () => true);
    updateIndeterminateCheckbox(false);
    // If the state goes from All selected to undetermined.
  } else if (nextState.getIn(['selectedElements', 'allSelected'])) {
    nextState = nextState.updateIn(['selectedElements', 'allSelected'], () => false);
    updateIndeterminateCheckbox(true);
    // If the state goes to unselected for all.
  } else if (currentPageSelectionsNr === 0) {
    updateIndeterminateCheckbox(false);
    //  If the state is undetermined.
  } else {
    updateIndeterminateCheckbox(true);
  }
  return nextState;

  function updateIndeterminateCheckbox(status) {
    let checkbox = document.getElementById('check-all-elements');
    checkbox.indeterminate = status;
  }
}

function selectAllElemets(prevState) {
  // If there were elements selected (all/indeterminate nr), unselect all checkboxes.
  let allSelected = prevState.getIn(['selectedElements', 'pageSelectionsNr']) ?
    false : true;

  const folders = prevState.getIn(['folderTemplatesContent', 'folders']);
  const templates = prevState.getIn(['folderTemplatesContent', 'templates']);

  const totalItemsNumber = folders.size + templates.size;

  let selectedElementsObj = {
    allSelected: allSelected,
    pageSelectionsNr: allSelected ? totalItemsNumber : 0
  };

  let selectedFolders = [];
  let selectedTemplates = [];

  // If we check them all, add the keys of the elements from the page in the
  // selected elements object.
  if (selectedElementsObj.allSelected) {
    folders.map(item => {
      selectedFolders.push(item.get('id'));
    });
    templates.map(item => {
      selectedTemplates.push(item.get('id'));
    });
  }
  const nextState = prevState.set('selectedElements', toImmutable(selectedElementsObj))
    .set('selectedFolders', toImmutable(selectedFolders)).set('selectedTemplates', toImmutable(selectedTemplates));
  return nextState;
}


function getFolderContents(state, payload) {
  return state.setIn(['folderTemplatesContent', 'folders'], toImmutable(payload.data.folders))
    .setIn(['folderTemplatesContent', 'items'], toImmutable(payload.data.items));
}
function getFolderContentsFail(state) {
  return state.state.setIn(['folderTemplatesContent', 'folders'], toImmutable([]))
    .setIn(['folderTemplatesContent', 'items'], toImmutable([]));
}
function updateSortMethod(prevState, payload) {
  return prevState.set('currentSortMethod', toImmutable(payload));
}
function setSearchTerm(state, payload) {
  return state.set('searchQuery', payload);
}
function setSearchSuccess(state, payload) {
  return state.set('folderTemplatesContent', toImmutable(payload.data));
}

function applyFiltersSuccess(state, payload) {
  if (payload) {
    return state.set('folderTemplatesContent', toImmutable(payload));
  }
  return state;
}

function resetSelections(state) {
  return state.set('selectedTemplates', toImmutable([])).set('selectedFolders', toImmutable([]));
}

function setTemplateEmails(state, data) {
  return state.set('emailsTemplates', toImmutable(data.payload));
}

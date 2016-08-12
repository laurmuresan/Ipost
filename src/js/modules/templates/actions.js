import context, { actions } from '../../application-context';
import { createAction, createBatchActions } from '../../create-action';
import { templateNotifications } from '../../resources/custom-notification-errors';
import { TOGGLE_PANEL } from '../layout/action-types';
import { CHANGE_PROPERTIES } from '../properties/action-types';

import { RESET_NOTIFICATIONS } from '../notifications/action-types';

import * as ActionTypes from './action-types';

import DataProvider from '../../data-provider';

const API = new DataProvider();

export function getFolders() {
  createAction({type: ActionTypes.GET_TEMPLATES_FOLDERS_START, payload: {}});

  API.get(API.endpoints.templateFolderTree).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      return createAction({type: ActionTypes.GET_TEMPLATES_FOLDERS_SUCCESS, payload: res.body});
    }
    return createAction({type: ActionTypes.GET_TEMPLATES_FOLDERS_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.GET_TEMPLATES_FOLDERS_FAIL, payload: err});
  });
}

export function collapseAll() {
  createAction({type: ActionTypes.COLLAPSE_ALL, payload: ''});
}
export function collapseOne(payload) {
  createAction({type: ActionTypes.COLLAPSE_FOLDER, payload: payload});
}

export function toggleFolderRenameState(payload) {
  createAction({type: ActionTypes.TOGGLE_RENAME_INPUT, payload: payload});
}

export function renameFolder(payload) {
  createAction({type: ActionTypes.RENAME_TEMPLATE_FOLDER_START, payload: {}});
  if (payload){
    createAction({type: ActionTypes.RENAME_TEMPLATE_FOLDER_SUCCESS, payload: payload});
  }

  API.patch(API.endpoints.renameTemplateFolder, payload).then((res) => {
      const { data, errors } = res.body;
      if (data) {
        data.id = payload.data.id;
        const dispatched = createAction({type: ActionTypes.RENAME_TEMPLATE_FOLDER_SUCCESS, payload: data});
        getFolders();
        getFolderContents({id: payload.data.parentId});
        return dispatched;
      }
      return createAction({type: ActionTypes.RENAME_TEMPLATE_FOLDER_FAILED, payload: errors});
    })
    .catch((err) => {
      return createAction({type: ActionTypes.RENAME_TEMPLATE_FOLDER_FAILED, payload: err});
    });
}

export function createNewFolder(payload){
  createAction({type: ActionTypes.CREATE_TEMPLATE_FOLDER_START, payload: {}});

  API.post(API.endpoints.createNewTemplateFolder, payload).then((res) => {
      const { data, errors } = res.body;
      if (data) {
        createBatchActions(
          {type: TOGGLE_PANEL, payload: 'newFolder'},
          {type: ActionTypes.CREATE_TEMPLATE_FOLDER_SUCCESS, payload: data},
          {type: RESET_NOTIFICATIONS, payload: ''}
        );

        resetNewFolder();
        getFolders();

        getFolderContents({
          folder: {
            id: payload.parentId
          }
        });
        return;
      }
      return createAction({type: ActionTypes.CREATE_TEMPLATE_FOLDER_FAIL, payload: errors});
    })
    .catch((err) => {
      return createAction({type: ActionTypes.CREATE_TEMPLATE_FOLDER_FAIL, payload: err});
    });
}

export function resetNewFolder(){
  createAction({type: ActionTypes.RESET_NEW_TEMPLATE_FOLDER, payload: {}});
}

export function setNewFolderNameInStore(payload) {
  createAction({type: ActionTypes.SET_TEMPLATE_FOLDER_NAME, payload: payload});
}

export function validateNewFolderName(payload) {
  createAction({type: ActionTypes.VALIDATE_FOLDER_NAME, payload: payload});
}

export function selectTreeElement(payload) {
  createAction({type: ActionTypes.SELECT_TREE_ELEMENT, payload: payload});
}
export function selectListElement(payload) {
  createAction({type: ActionTypes.SELECT_LIST_ELEMENT, payload: payload});
}

export function selectElement(payload) {
  createAction({type: ActionTypes.SELECT_ELEMENT, payload: payload});
}

export function resetSelections() {
  createAction({type: ActionTypes.RESET_TEMPLATE_SELECTIONS, payload: {}});
}

export function selectAllElements(payload) {
  createAction({type: ActionTypes.SELECT_ALL_TEMPLATES_ELEMENTS, payload: payload});
}

export function setMoveToFolder(payload) {
  createAction({type: ActionTypes.SET_MOVE_FOLDER_ID_TEMPLATES, payload: payload});
}
export function showMoveModal(payload) {
  createAction({type: ActionTypes.SHOW_MOVE_MODAL_TEMPLATES, payload: payload});
}
export function showDeleteModal(payload) {
  createAction({type: ActionTypes.SHOW_DELETE_MODAL_TEMPLATES, payload: payload});
}
export function countSubFoldersToBeDeleted(payload) {
  createAction({type: ActionTypes.GET_SUBFOLDERS_NUMBER, payload: payload});
}
export function getFolderContents(payload) {
  createAction({type: ActionTypes.GET_TEMPLATE_FOLDER_CONTENT_START, payload: payload});

  const currentSortMethod =
    context.evaluateToJS(context.modules.templates.getters.currentSortMethod);

  const page =
    context.evaluateToJS(context.modules.pagination.getters.currentPage) || 1;
  const sortOptions = currentSortMethod.sortBy ? currentSortMethod : {sortBy: 'name', sortOrder: 'asc'};

  API.get(API.endpoints.getTemplateFolderContents, {
    folderId: payload.id,
    sortBy: sortOptions.sortBy,
    sortOrder: sortOptions.sortOrder,
    page: page
  }).then((res) => {
    const { data, meta, errors } = res.body;
    if (data) {
      return context.batch(() => {
        createAction({type: ActionTypes.GET_TEMPLATE_FOLDER_CONTENT_SUCCESS, payload: res.body});
        context.modules.pagination.actions.updatePaginationInfo({meta});
      });
    }

    return createAction({type: ActionTypes.GET_TEMPLATE_FOLDER_CONTENT_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.GET_TEMPLATE_FOLDER_CONTENT_FAIL, payload: err});
  });
}

export function updateSortMethod(payload) {
  const sortOptions = {
    sortBy: payload.sortBy,
    sortOrder: payload.sortOrder
  };
  createAction({type: ActionTypes.UPDATE_TEMPLATES_SORT_METHOD, payload: sortOptions});
  getFolderContents(payload);
}

export function getSelectedFoldersForDeletion(payload){
  createAction({type: ActionTypes.GET_SELECTED_TEMPLATE_FOLDERS_DELETION, payload: payload});
}
export function setSingleDeletionSelection(payload){
  createAction({type: ActionTypes.GET_TEMPLATE_SINGLE_DELETION_SELECTION, payload: payload});
}

export function resetDeletionSelections(payload){
  createAction({type: ActionTypes.RESET_TEMPLATE_DELETION_SELECTIONS, payload: payload});
}

export function deleteFoldersAndTemplates(info){
  createAction({type: ActionTypes.RESET_TEMPLATE_DELETION_SELECTIONS, payload: info});

  const payload = {
    folders: info.folders,
    items: info.templates
  };

  API.patch(API.endpoints.deleteFoldersAndTemplates, payload).then((res) => {
    const { data, errors } = res.body;
    if (data){
      const dispatched = createAction({type: ActionTypes.DELETE_FOLDERS_AND_TEMPLATES_SUCCESS, payload: data});
      getFolders();
      getFolderContents({ id: info.parentFolder });
      //resetDeletionSelections();

      return dispatched;
    }
    return createAction({type: ActionTypes.DELETE_FOLDERS_AND_TEMPLATES_FAILED, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.DELETE_FOLDERS_AND_TEMPLATES_FAILED, payload: err});
  });
}

export function moveSelectedToFolder(payload) {
  createAction({type: ActionTypes.MOVE_TEMPLATE_FOLDER_START, payload: {}});

  API.patch(API.endpoints.moveTemplateFolder, payload).then((res) => {
    const { data, errors } = res.body;
    if (data){
      return createAction({type: ActionTypes.MOVE_TEMPLATE_FOLDER_SUCCESS, payload: data});
    }
    return createAction({type: ActionTypes.MOVE_TEMPLATE_FOLDER_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.MOVE_TEMPLATE_FOLDER_FAIL, payload: err});
  });
}

export function resetMoveTo() {
  createAction({type: ActionTypes.RESET_MOVE_TO, payload: {}});
}

export function setSearchTerm(payload) {
  createAction({type: ActionTypes.SET_TEMPLATE_SEARCH_TERM, payload: {payload}});
}
export function searchTemplates(payload) {
  //const currentSortMethod =
  //  context.evaluateToJS(context.modules.templates.getters.currentSortMethod);

  createAction({type: ActionTypes.SEARCH_TEMPLATES_START, payload: payload});
  const { query } = payload;
  const sortBy = payload.sortBy ? payload.sortBy : 'name';
  const sortOrder = payload.sortOrder ? payload.sortOrder : 'asc';
  const page =
    context.evaluateToJS(context.modules.pagination.getters.currentPage) || 1;

  API.get(API.endpoints.searchInTemplatesAndFolders, { query, sortBy, sortOrder, page }).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      return createAction({type: ActionTypes.SEARCH_TEMPLATES_SUCCESS, payload: res.body});
    }
    return createAction({type: ActionTypes.SEARCH_TEMPLATES_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.SEARCH_TEMPLATES_FAIL, payload: err});
  });
}

export function applyFilters(payload) {
  createAction({type: ActionTypes.APPLY_TEMPLATES_FILTERS_START, payload: payload});

  let sortBy = payload.get('sortBy') ? payload.get('sortBy') : 'name';
  let orderBy = payload.get('orderBy') ? payload.get('orderBy') : 'asc';
  const page =
    context.evaluateToJS(context.modules.pagination.getters.currentPage) || 1;

  API.get(API.endpoints.filterTemplatesAndFolders, {
    dateCreatedFrom: payload.getIn(['filters', 'dateCreated']).startDate ? payload.getIn(['filters', 'dateCreated']).startDate.format('gggg-MM-DD') : '',
    dateCreatedTo: payload.getIn(['filters', 'dateCreated']).endDate ? payload.getIn(['filters', 'dateCreated']).endDate.format('gggg-MM-DD') : '',
    type: payload.getIn(['filters', 'type']),
    sortBy: sortBy,
    orderBy: orderBy,
    page
  }).then((res) => {
    const { data, errors, meta } = res.body;
    if (data) {
      context.modules.pagination.actions.updatePaginationInfo({meta});
      return createAction({type: ActionTypes.APPLY_TEMPLATES_FILTERS_SUCCESS, payload: data});
    }
    return createAction({type: ActionTypes.APPLY_TEMPLATES_FILTERS_SUCCESS, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.APPLY_TEMPLATES_FILTERS_FAIL, payload: err});
  });

}

export function getEmailsWithTemplateId(info) {
  createAction({type: ActionTypes.GET_EMAILS_WITH_TEMPLATE_ID_START, payload: info});
  const page =
    context.evaluateToJS(context.modules.pagination.getters.currentPage) || 1;

  const query = {
    templateId: info.id,
    type: 'template',
    sortBy: 'name',
    sortOrder: 'asc',
    page: page,
    noFolders: 1 //flag for not returning folders in the JSON
  };

  API.get(API.endpoints.getTemplateEmailsBasedOnTemplate, query).then((res) => {
    const { data, errors, meta } = res.body;

    if (data) {
      return createAction({type: ActionTypes.GET_EMAILS_WITH_TEMPLATE_ID_SUCCESS, payload: { data, meta }});
    }
    return createAction({type: ActionTypes.GET_EMAILS_WITH_TEMPLATE_ID_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.GET_EMAILS_WITH_TEMPLATE_ID_FAIL, payload: err});
  });
}

export function searchTemplatesEmail(payload) {
  //const currentSortMethod =
  //  context.evaluateToJS(context.modules.templates.getters.currentSortMethod);

  createAction({type: ActionTypes.SEARCH_EMAILS_TEMPLATES_START, payload: payload});

  const { query } = payload;
  const type = 'template';
  const sortBy = payload.sortBy ? payload.sortBy : 'name';
  const sortOrder = payload.sortOrder ? payload.sortOrder : 'asc';
  const pageNumber = 1;
  const noFolders = 1; //flag for not returning folders in the JSON


  API.get(API.endpoints.getTemplateEmailsBasedOnTemplate, { query, type, sortBy, sortOrder, pageNumber, noFolders }).then((res) => {
    const { data, errors, meta } = res.body;

    if (data) {
      return context.batch(() => {
        createAction({type: ActionTypes.SEARCH_EMAILS_TEMPLATES_SUCCESS, payload: res.body});
        context.modules.pagination.actions.updatePaginationInfo({meta});
      });
    }
    return createAction({type: ActionTypes.SEARCH_EMAILS_TEMPLATES_FAIL, payload: errors});
  }).catch((err) => {
    return context.dispatch({type: ActionTypes.SEARCH_EMAILS_TEMPLATES_FAIL, payload: err});
  });
}
export function getFoldersWithTemplates() {
  createAction({type: ActionTypes.GET_FULL_TEMPLATES_FOLDERS_START, payload: {}});

  API.get(API.endpoints.fullTemplateTree).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      return createAction({type: ActionTypes.GET_FULL_TEMPLATES_FOLDERS_SUCCESS, payload: res.body});
    }
    return createAction({type: ActionTypes.GET_FULL_TEMPLATES_FOLDERS_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.GET_FULL_TEMPLATES_FOLDERS_FAIL, payload: err});
  });
}
export function setChangeTemplateId(payload){
  createAction({type: ActionTypes.SET_CHANGE_TEMPLATE, payload: payload});
}

export function publishTemplate(payload) {
  createAction({type: ActionTypes.PUBLISH_TEMPLATE_START, payload: {}});
  const notification = templateNotifications.publishTemplate;

  API.post(API.endpoints.publishTemplate, payload).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      actions.notifications.showCreationNotifications({ notification });
      return createBatchActions(
        {type: ActionTypes.PUBLISH_TEMPLATE_SUCCESS, payload: res.body},
        {type: CHANGE_PROPERTIES, payload: {status: 'public'}}
      );
    }
    return createAction({type: ActionTypes.PUBLISH_TEMPLATE_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.PUBLISH_TEMPLATE_FAIL, payload: err});
  });
}

export function unpublishTemplate(payload) {
  createAction({type: ActionTypes.UNPUBLISH_TEMPLATE_START, payload: {}});
  const notification = templateNotifications.unpublishTemplate;

  API.post(API.endpoints.unpublishTemplate, payload).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      actions.notifications.showCreationNotifications({ notification });
      return createBatchActions(
        {type: ActionTypes.UNPUBLISH_TEMPLATE_SUCCESS, payload: res.body},
        {type: CHANGE_PROPERTIES, payload: { status: 'draft'}}
      );
    }
    return createAction({type: ActionTypes.UNPUBLISH_TEMPLATE_FAIL, payload: errors});
  }).catch((err) => {
    return createAction({type: ActionTypes.UNPUBLISH_TEMPLATE_FAIL, payload: err});
  });
}

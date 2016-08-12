import context from '../../application-context';
import { TOGGLE_PANEL } from '../layout/action-types';
import { RESET_NOTIFICATIONS } from '../notifications/action-types';
import { UPDATE_PAGINATION_INFO } from '../pagination/action-types';

import * as ActionTypes from './action-types';

import DataProvider from '../../data-provider';

const API = new DataProvider();

export function renameFolder(payload) {
  context.dispatch(ActionTypes.RENAME_FOLDER_START, {});

  API.patch(API.endpoints.renameFolder, payload).then((res) => {
     const { data, errors } = res.body;
      if (data) {
        data.id = payload.data.folderId;
        const dispatched = context.dispatch(ActionTypes.RENAME_FOLDER_SUCCESS, data);
        getFoldersTree();
        return dispatched;
      }
      return context.dispatch(ActionTypes.RENAME_FOLDER_FAILED, errors);
  })
  .catch((err) => {
  return context.dispatch(ActionTypes.RENAME_FOLDER_FAILED, err);
  });
}

export function changeGridFolder(payload){
  context.dispatch(ActionTypes.CHANGE_FOLDER, payload);
}

export function setNewFolderNameInStore(payload){
  context.dispatch(ActionTypes.SET_NEW_FOLDER_NAME_IN_STORE, payload);
}

export function validateNewFolderName(payload){
  context.dispatch(ActionTypes.VALIDATE_NEW_FOLDER_NAME, payload);
}

export function resetNewFolder(payload){
  context.dispatch(ActionTypes.RESET_NEW_FOLDER, payload);
}

export function createNewFolder(payload){
  context.dispatch(ActionTypes.CREATE_FOLDER_START, {});

  API.post(API.endpoints.createNewFolder, payload).then((res) => {
       const { data, errors } = res.body;
        if (data) {

          context.batch(() => {
            context.dispatch(TOGGLE_PANEL, 'newFolder');
            context.dispatch(ActionTypes.CREATE_FOLDER_SUCCESS, data);
            context.dispatch(RESET_NOTIFICATIONS, '');
          });

          resetNewFolder();
          getFoldersTree();

          getFolderContents({
            folder: {
              id: payload.parentId
            }
          });

          return;
        }

        return context.dispatch(ActionTypes.CREATE_FOLDER_FAILED, errors);
    })
    .catch((err) => {
    return context.dispatch(ActionTypes.CREATE_FOLDER_FAILED, err);
    });
}

export function getFoldersTree(payload) {
  API.get(API.endpoints.foldersTree).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      return context.dispatch(ActionTypes.GET_FOLDERS_TREE_SUCCESS, res.body);
    }
    return context.dispatch(ActionTypes.GET_FOLDERS_TREE_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.GET_FOLDERS_TREE_FAILED, err);
  });
}

export function getAutomationFoldersTree(payload) {
  API.get(API.endpoints.genericFoldersTree, {entityGroup: 'automations'}).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      return context.dispatch(ActionTypes.GET_FOLDERS_TREE_SUCCESS, res.body);
    }
    return context.dispatch(ActionTypes.GET_FOLDERS_TREE_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.GET_FOLDERS_TREE_FAILED, err);
  });
}

export function setMoveToFolder(payload) {
  const { modules } = context;
  let properties;

  if (payload === 'grabFromPropertiesGetter') {
    properties = context.evaluate(modules.properties.getters.properties);
    payload = {
      id: properties.get('folderId'),
      label: properties.get('folderLabel')
    };
  }

  context.dispatch(ActionTypes.SET_MOVE_FOLDER_ID, payload);
}

export function moveSelectedToFolder(payload) {
  const { modules } = context;
  let foldersIds = [];
  let emailsIds = [];

  context.dispatch(ActionTypes.MOVE_FOLDER_START, true);

  if (!payload) {
    payload = {
      target: context.evaluate(modules.folders.getters.moveTo),
      moveItems: context.evaluate(modules.folders.getters.moveItems),
      activeFolder: context.evaluate(modules.folders.getters.folder)
    };
  }

  if (payload.moveItems.get('moveSingleFolderId') === -1 && payload.moveItems.get('moveSingleTicketId') === -1) {
    foldersIds = payload.moveItems.get('selectedFolders').toJS();
    emailsIds = payload.moveItems.get('selectedTickets').toJS();
  } else if (payload.moveItems.get('moveSingleFolderId') !== -1) {
    foldersIds.push(payload.moveItems.get('moveSingleFolderId'));
  } else {
    emailsIds.push(payload.moveItems.get('moveSingleTicketId'));
  }

  var sendData = {
    'target_id': payload.target.get('id'),
    'folders': foldersIds,
    'emails': emailsIds
  };
  API.patch(API.endpoints.moveFolder, sendData).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      let dispatched = context.dispatch(ActionTypes.MOVE_FOLDER_SUCCESS, res.body);
      getFoldersTree();
      return dispatched;
    }
    return context.dispatch(ActionTypes.MOVE_FOLDER_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.MOVE_FOLDER_FAILED, err);
  });
}

export function addToSelectedFolders(payload) {
  context.dispatch(ActionTypes.ADD_TO_SELECTED_FOLDERS, payload);
}

export function addToSelectedTickets(payload) {
  context.dispatch(ActionTypes.ADD_TO_SELECTED_TICKETS, payload);
}

export function showMoveModal(payload) {
  context.dispatch(ActionTypes.SHOW_MOVE_MODAL, payload);
}

export function showGridFoldersLeft(payload) {
  context.dispatch(ActionTypes.SHOW_GRID_FOLDERS_LEFT, payload);
}

export function checkAll(payload) {
  context.dispatch(ActionTypes.CHECK_ALL, payload);
}

export function moveSingleFolder(payload) {
  context.dispatch(ActionTypes.MOVE_SINGLE_FOLDER, payload);
}

export function moveSingleTicket(payload) {
  context.dispatch(ActionTypes.MOVE_SINGLE_TICKET, payload);
}

export function updateSortMethod(payload){
  context.dispatch(ActionTypes.UPDATE_SORT_METHOD, payload);
}

export function showBreadcrumbs(payload){
  context.dispatch(ActionTypes.SHOW_BREADCRUMBS, payload);
}

export function showBottomBreadcrumbs(payload) {
  context.dispatch(ActionTypes.SHOW_BOTTOM_BREADCRUMBS, payload);
}

export function getFolderContents({ folder, sortBy = 'created_date', sortOrder = 'desc'} = {}) {
  folder = folder ||
    context.evaluateToJS(context.modules.folders.getters.folder);
  const currentPage =
    context.evaluateToJS(context.modules.pagination.getters.currentPage) || 1;

  context.dispatch(ActionTypes.GET_FOLDER_CONTENTS_START, {});

  API.get(API.endpoints.getFolderContents, {
    folderId: folder.id,
    sortBy: sortBy,
    sortOrder: sortOrder,
    page: currentPage,
  }).then((res) => {
    const { data, meta, errors } = res.body;
    if (data) {
      context.dispatch(UPDATE_PAGINATION_INFO, {meta});
      return context.dispatch(ActionTypes.GET_FOLDER_CONTENTS_SUCCESS, {
        folder: folder, content: res.body, meta,
      });
    }
    return context.dispatch(ActionTypes.GET_FOLDER_CONTENTS_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.GET_FOLDER_CONTENTS_FAILED, err);
  });

}

export function showAdditionalButtons(payload) {
  context.dispatch(ActionTypes.SHOW_ADDITIONAL_BUTTONS, payload);
}

export function collapseAllFolders(payload) {
  context.dispatch(ActionTypes.COLLAPSE_ALL_FOLDERS, payload);
}

export function applyFilters(payload) {
  const type = payload.getIn(['filters', 'type']);
  const status = payload.getIn(['filters', 'status']);
  const campaign = payload.getIn(['filters', 'campaign']);
  const sortBy = payload.get('sortBy') ? payload.get('sortBy') : 'name';
  const orderBy = payload.get('orderBy') ? payload.get('orderBy') : 'asc';

  const dateCreatedFrom = payload.getIn(['filters', 'dateCreated']).startDate ?
    payload.getIn(['filters', 'dateCreated']).startDate.format('gggg-MM-DD') : '';

  const dateCreatedTo = payload.getIn(['filters', 'dateCreated']).endDate ?
    payload.getIn(['filters', 'dateCreated']).endDate.format('gggg-MM-DD') : '';

  const params = {
    dateCreatedFrom,
    dateCreatedTo,
    type,
    status,
    sortBy,
    orderBy,
    campaign
  };

  context.dispatch(ActionTypes.APPLY_FILTERS_START, payload);

  API.get(API.endpoints.filterContents, params)
    .then((res) => {
      const { data, errors } = res.body;
      if (data) {
        context.dispatch(ActionTypes.APPLY_FILTERS_SUCCESS, data);
        return;
      }

      context.dispatch(ActionTypes.APPLY_FILTERS_FAILED, errors);
    })

    .catch((err) => {
      context.dispatch(ActionTypes.APPLY_FILTERS_FAILED, err);
    });
}

export function getSelectedFoldersForDeletion(payload){
  context.dispatch(ActionTypes.GET_SELECTED_FOLDERS_FOR_DELETION, payload);
}

export function setSingleDeletionSelection(payload){
  context.dispatch(ActionTypes.GET_SINGLE_DELETION_SELECTION, payload);
}

export function resetDeletionSelections(payload){
  context.dispatch(ActionTypes.RESET_DELETION_SELECTIONS, payload);
}

export function deleteFoldersAndEmails(payload){
  context.dispatch(ActionTypes.DELETE_FOLDERS_AND_EMAILS_START, payload);

  const { folders, emails, parentFolder } = payload;

  API.patch(API.endpoints.deleteFoldersAndEmails, { folders, emails }).then((res) => {
    const { data, errors } = res.body;
    if (data){
      const dispatched = context.dispatch(ActionTypes.DELETE_FOLDERS_AND_EMAILS_SUCCESS, data);
      getFoldersTree();
      getFolderContents({ folder: parentFolder.toJS() });
      resetDeletionSelections();

      return dispatched;
    }
    return context.dispatch(ActionTypes.DELETE_FOLDERS_AND_EMAILS_FAIL, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.DELETE_FOLDERS_AND_EMAILS_FAIL, err);
  });
}

export function updateSearchQuery(payload){
  context.dispatch(ActionTypes.UPDATE_SEARCH_QUERY, payload);
}

export function updateMoveFolderModalSearchQuery(payload) {
  context.dispatch(ActionTypes.UPDATE_MOVE_FOLDER_MODAL_SEARCH_QUERY, payload);
}

export function searchFoldersAndEmails(payload){
  context.dispatch(ActionTypes.SEARCH_EMAILS_AND_FOLDERS_START, payload);

  const { query, sortBy, orderBy, page } = payload;

  API.get(API.endpoints.searchFoldersAndEmails, { query, sortBy, orderBy, page }).then((res) => {
    let { data, errors } = res.body;
    if (data){
      const { folders, emails } = data;
      return context.dispatch(ActionTypes.SEARCH_EMAILS_AND_FOLDERS_SUCCESS, { folders, emails });
    }
    return context.dispatch(ActionTypes.SEARCH_EMAILS_AND_FOLDERS_FAIL, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.SEARCH_EMAILS_AND_FOLDERS_FAIL, err);
  });
}

export function searchFolders(payload){
  context.dispatch(ActionTypes.SEARCH_FOLDERS_START, payload);

  const { query, sortBy, orderBy, page } = payload;

  API.get(API.endpoints.searchFoldersAndEmails, { query, sortBy, orderBy, page }).then((res) => {
    let { data, errors } = res.body;
    if (data){
      const { folders } = data;
      return context.dispatch(ActionTypes.SEARCH_FOLDERS_SUCCESS, { folders });
    }
    return context.dispatch(ActionTypes.SEARCH_FOLDERS_FAIL, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.SEARCH_FOLDERS_FAIL, err);
  });
}

export function cancelSearch(payload){
  const { folder } = payload;
  showBreadcrumbs(true);
  updateSearchQuery('');
  getFolderContents({ folder: folder.toJS()});

  return context.dispatch(ActionTypes.CANCEL_SEARCH, payload);
}

export function cancelMoveFolderModalSearch(payload) {
  return context.dispatch(ActionTypes.CANCEL_MOVE_FOLDER_MODAL_SEARCH, payload);
}

export function setBottomBreadcrumbsTarget(payload) {
  return context.dispatch(ActionTypes.SET_BOTTOM_BREADCRUMBS_TARGET, payload);
}

export function toggleFolderRenameState(payload){
  return context.dispatch(ActionTypes.TOGGLE_FOLDER_RENAME_STATE, payload);
}

export function setGridViewType(gridViewType) {
  //type = folder / search / filter
  return context.dispatch(ActionTypes.SET_GRID_VIEW_TYPE, gridViewType);
}

export function setSelectedFolderIdFromList(payload) {
  return context.dispatch(ActionTypes.SET_SELECTED_FOLDER_ID_FROM_LIST, payload);
}

export function setSelectedFolderIdFromTree(payload) {
  return context.dispatch(ActionTypes.SET_SELECTED_FOLDER_ID_FROM_TREE, payload);
}

export function duplicateEmail(payload) {
  context.dispatch(ActionTypes.DUPLICATE_EMAIL_START, payload);

  const { emailId, folder } = payload;

  API.post(API.endpoints.duplicateEmail, { id: emailId }).then((res) => {
    const { data, errors } = res.body;

    if (data) {
      const dispatched = context.dispatch(ActionTypes.DUPLICATE_EMAIL_SUCCESS, data);

      getFolderContents({ folder });
      return dispatched;
    }
    return context.dispatch(ActionTypes.DUPLICATE_EMAIL_FAIL, errors);
  }).catch((err) => {
    return context.dispatch(ActionTypes.DUPLICATE_EMAIL_FAIL, err);
  });
}

export function getSelectedEmailsForDeletion(payload) {
  context.dispatch(ActionTypes.GET_SELECTED_EMAILS_FOR_DELETION, {});
}

export function setSingleEmailSelection(payload) {
  context.dispatch(ActionTypes.SET_SINGLE_EMAIL_SELECTION, payload);
}

export function resetSingleEmailSelection(payload) {
  context.dispatch(ActionTypes.RESET_SINGLE_EMAIL_SELECTION, {});
}

export function setOpenInFolderTree(payload) {
  context.dispatch(ActionTypes.SET_OPEN_IN_FOLDER_TREE, payload);
}

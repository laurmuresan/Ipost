import context, { actions, getters } from '../../application-context';
import isArray from 'lodash/isArray';
import { browserHistory } from 'react-router';
import entityUrlBuilder from '../../utils/entity-url-builder';
import entityAttributesProcessor from '../../utils/entity-attributes-processor';
import * as Constants from './constants';

import DataProvider from '../../data-provider';
import {
  loadEntitySuccess,
  loadEntityFailed,
  processOperation,
  createOperationsEntityStore,
  selectInitialFolder,
  isFetchingData
} from '../entity-cache/actions';

import { CURRENT_ENTITY_GROUP, CURRENT_ENTITY_TYPE } from '../../modules/generic-manager/constants';

const API = new DataProvider();

const attributesOrder = [
  'type',
  'folderId',
  'status',
  'sendable',
  'usedInTesting',
  'count',
  'countValue'
];

export function setupEntityGroup(entity) {
  processOperation({
    operation: 'SETUP_ENTITY',
    params: {entityType: entity}
  }, CURRENT_ENTITY_GROUP);
}

export function setupEntityType(entity) {
  processOperation({
    operation: 'SETUP_ENTITY',
    params: {entityType: entity}
  }, CURRENT_ENTITY_TYPE);
}

export function fetchFoldersTree(type) {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const entityType = type || context.evaluate(getOperations(CURRENT_ENTITY_TYPE));
  const selectedFolder = context.evaluate(getOperations(entityGroup, 'selectedFolder'));
  const selectedFolderLabel = context.evaluate(getOperations(entityGroup, 'selectedFolderLabel'));
  const expandedList = context.evaluate(getOperations(entityGroup, 'expandedList'));

  let params = {};

  if (selectedFolder) {
    params = {...params, selectedFolder};
  }

  if (expandedList) {
    params = {...params, expandedList};
  }

  createOperationsEntityStore(entityGroup, params);
  isFetchingData(entityGroup, true);

  API.get(API.endpoints.genericFoldersTree, {entityGroup, type: entityType}).then((res) => {
    const { data, errors } = res.body;

    if (data) {

      selectInitialFolder(entityGroup, data.nodes.id, data.nodes.name);
      loadEntitySuccess(Constants.ENTITY_TREE_DATA, [data.nodes]);

      // Fetch root folder content
      getFolderContent({
        folderId: selectedFolder || data.nodes.id,
        folderLabel: selectedFolderLabel || data.nodes.name,
        noFolders: 1,
        entityType
      });
    } else {
      loadEntityFailed(Constants.ENTITY_TREE_DATA, errors);
    }
  }).catch((err) => {
    loadEntityFailed(Constants.ENTITY_TREE_DATA, err);
  });
}

export function getFolderContent({
  folderId = null, folderLabel = '', page = 1, perPage = 20,
  sortBy = null, sortOrder = null, noFolders = 1, entityType = null } = {}) {

  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const type = entityType || context.evaluate(getOperations(CURRENT_ENTITY_TYPE));

  const getSorting = () =>
    context.evaluate(getOperations(entityGroup, 'sort'));

  if (sortBy === null || sortOrder === null) {
    const sorting = getSorting();

    if (sorting) {
      sortBy = sorting.get('sortBy');
      sortOrder = sorting.get('sortOrder');
    } else {
      sortBy = 'date_created';
      sortOrder = 'desc';
    }
  }

  let filters = context.evaluate(context.getters.filters.selectedFilters);
  const searchQuery = context.evaluate(context.getters.filters.searchQuery);
  const isPersistent = filters.getIn(['type', 'subtype']) === 'persistent';
  if (folderId === null || isPersistent) {
    if (isPersistent && folderId !== null) {
      filters = filters.setIn(['folderId', 'value'], folderId);
      actions.filters.selectFilters(filters.toJS());
      selectFolder(folderId, folderLabel);
    }
    /** if folder id is null that means that we are changing pages or sorting
     * functions that should be available during search and filtering
     */
    if (filters && filters.size) {
      return filterEntities({sortBy, sortOrder, page, perPage});
    } else {
      if (searchQuery) {
        return searchEntities({sortBy, sortOrder, page, perPage, entityType: type});
      }
    }
  }

  if (folderId !== null) {
    /** if opening a folder, the folderId will be in the payload of the function and
     * therefore the widgets should close
     */
    noFolders = 1;
    resetWidgets(true);
  }

  const getFolderId = () =>
    context.evaluate(getOperations(entityGroup, 'selectedFolder'));

  if (folderId === null) {
    folderId = getFolderId();

    /** in the action is called without `folderId` and
     * `getFolderId` returns `undefined`, set it to 0 and
     * the backend will return the root folder
     */

    if (!folderId) {
      folderId = 0;
    }
  }

  if (entityType) {
    folderId = 0;
  }

  isFetchingData(entityGroup, true);

  API.get(API.endpoints.genericFolderContents, {
    folderId, page, perPage, entityGroup, type: type, sortBy, sortOrder, noFolders
  }).then((res) => {
    let { data, meta = {}, errors } = res.body;

    if (data) {
      data = data.nodes ? data.nodes : data;

      if (areSelections()) {
        selectAllEntities();
      }

      selectFolder(folderId, folderLabel);
      loadEntitySuccess(Constants.ENTITY_CONTENT_DATA, data, meta);
    } else {
      loadEntityFailed(Constants.ENTITY_CONTENT_DATA, errors);
    }
  }).catch((err) => loadEntityFailed(Constants.ENTITY_CONTENT_DATA, err));

}

export function editEntity(entity) {
  const nextRoute = entityUrlBuilder();
  const entityType = entity.get('entityType');
  const id = (entityType === 'ticket_report') ? entity.get('mailingId') : entity.get('id');
  const attrs = entityAttributesProcessor(entity.get('attributes'));

  let contentType = attrs.get('contentType') || attrs.get('type');

  nextRoute.slash().addPart(entityType).slash();

  if (nextRoute.urlExceptions.hasOwnProperty(contentType)) {
    contentType = nextRoute.urlExceptions[contentType](contentType);
  }

  if (contentType) {
    nextRoute.addPart(contentType).slash();
  }

  nextRoute.addPart(id);

  browserHistory.push(nextRoute.get());
}

/**
 * Select entity operation
 * @param folderId
 */
export function selectFolder(folderId, folderLabel) {
  processOperation({
    operation: Constants.SELECT_TREE_ITEM,
    params: {
      id: folderId,
      label: folderLabel
    }
  });
}

export function selectFolderFromModal(folderId, folderLabel) {
  processOperation({
    operation: Constants.SELECT_TREE_ITEM_IN_MODAL,
    params: {
      id: folderId,
      label: folderLabel
    }
  });
}

export function expandModalTreeItem(folderId) {
  processOperation({
    operation: Constants.EXPAND_MODAL_TREE_ITEM,
    params: {id: folderId}
  });
}

/**
 * Expand folder operation
 * @param folderId
 */
export function expandFolder(folderId) {
  processOperation({
    operation: Constants.EXPAND_TREE_ITEM,
    params: {id: folderId}
  });
}

export function expandFolders() {
  processOperation({
    operation: Constants.EXPAND_ALL_TREE_ITEMS
  });
}

export function invokeMoveModal() {
  processOperation({
    operation: Constants.TOGGLE_MOVE_MODAL_STATE
  });
}

export function invokeDeleteModal() {
  processOperation({
    operation: Constants.TOGGLE_DELETE_MODAL_STATE
  });
}

/**
 * Select entity operation
 * @param itemId
 * @param entityType
 */
export function selectEntity(itemId, entityType) {
  processOperation({
    operation: Constants.SELECT_ENTITY,
    params: {
      id: itemId,
      type: entityType
    }
  });
}

export function selectAllEntities() {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const ENTITY_GROUP =
    context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  let content =
    context.evaluate(getters.entityCache.getEntity(ENTITY_GROUP, 'content'));

  content = (ENTITY_GROUP === 'campaigntags' || ENTITY_GROUP === 'ticketreports') ? content.get('rows') : content;

  processOperation({
    operation: Constants.SELECT_ALL_ENTITIES,
    params: {content}
  });
}

export function toggleCreateFolder() {
  processOperation({
    operation: Constants.TOGGLE_CREATE_FOLDER,
    params: {activeWidget: 'createFolder'}
  });
}

export function toggleFilters() {
  const searchQuery = context.evaluate(context.getters.filters.searchQuery);

  if (searchQuery) {
    processOperation({
      operation: Constants.RESET_WIDGETS,
      params: { activeWidget: false }
    });
    selectCurrentItem('', []);
    getFolderContent();
  }

  processOperation({
    operation: Constants.TOGGLE_FILTERS,
    params: {activeWidget: 'filters'}
  });
}

export function toggleSearch() {
  const filters = context.evaluate(context.getters.filters.selectedFilters);

  if (filters && filters.size){
    processOperation({
      operation: Constants.RESET_WIDGETS,
      params: { activeWidget: false }
    });
    selectCurrentItem('', []);
    getFolderContent();
  }

  processOperation({
    operation: Constants.TOGGLE_SEARCH,
    params: {activeWidget: 'searchBar'}
  });
}

export function toggleActiveFilters() {
  processOperation({
    operation: Constants.TOGGLE_ACTIVE_FILTERS,
    params: {activeWidget: 'activeFilters'}
  });
}

export function setEntityForActions(itemId, entityType, modalType) {
  processOperation({
    operation: Constants.COLLECT_ENTITY_FOR_ACTIONS,
    params: {
      id: itemId,
      type: entityType,
      modalType
    }
  });
}

export function moveEntities({ targetId, selectedEntity }) {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));


  const folders = [];
  const items = [];

  if (!targetId && targetId !== 0) {
    targetId =
      context.evaluate(getOperations('modals', ['move', 'selectedTreeEntityId']));

    if (isNaN(targetId)) {
      targetId = context.evaluate(getters.entityCache.getEntity(entityGroup, ['tree', 0, 'id']));
    }
  }

  if (!selectedEntity) {
    selectedEntity = context.evaluate(getOperations('modals', ['move', 'currentEntity']));
  }

  if (selectedEntity && !isArray(selectedEntity)) {
    selectedEntity = [selectedEntity];
  }

  if (!selectedEntity) {
    selectedEntity =
      context.evaluate(getOperations(entityGroup, 'selectedEntities'));
  }

  selectedEntity.map((entity) => {
    if (entity.type === 'folder') {
      folders.push(entity.id);
    } else {
      items.push(entity.id);
    }
  });

  API.patch(API.endpoints.genericMoveEntities, {
    entityGroup, targetId, folders, items
  }).then((res) => {
      const { data, errors } = res.body;

      if (data) {
        actions.notifications.genericActionSuccess(data);
        if (areSelections()) {
          selectAllEntities();
        }
        fetchFoldersTree();
      } else {
        actions.notifications.genericActionFailed(errors);
        loadEntityFailed(Constants.ENTITY_CONTENT_DATA, errors);

      }
    })
    .catch((err) => loadEntityFailed(Constants.ENTITY_CONTENT_DATA, err));
}

export function sortEntities({ option, selectedIndex }) {
  getFolderContent(option);

  processOperation({
    operation: Constants.HANDLE_SORTING,
    params: {
      ...option,
      selectedIndex
    }
  });
}

export function focusOnCreationWidget() {
  processOperation({operation: Constants.FOCUS_ON_CREATION_WIDGET});
}

export function resetFocusOnCreationWidget() {
  processOperation({operation: Constants.RESET_FOCUS_ON_CREATION_WIDGET});
}

export function createNewFolder(payload) {
  const { name } = payload;
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const parentId = context.evaluate(getOperations(entityGroup, 'selectedFolder'));
  const expandedList = context.evaluate(getOperations(entityGroup, 'expandedList'));

  API.post(API.endpoints.genericCreateFolder, {name, parentId, entityGroup})
    .then((res) => {
      const {data, errors} = res.body;
      if (data) {
        context.dispatch(Constants.CREATE_NEW_FOLDER_SUCCESS, {});

        if (!expandedList.includes(parentId)) {
          expandFolder(parentId);
        }
        toggleCreateFolder();
        selectFolder(data.id, name);
        fetchFoldersTree();
        return;
      }

      return context.dispatch(Constants.CREATE_NEW_FOLDER_FAIL, errors);
    })
    .catch((err) => {
      return context.dispatch(Constants.CREATE_NEW_FOLDER_FAIL, err);
    });
}

export function renameEntity(payload) {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const {entityType, ...rest} = payload;
  const params = {...{entityGroup: entityGroup}, ...rest};

  const endpoint = entityType === 'folder' ? API.endpoints.genericFolderRename : API.endpoints.genericEntityRename;

  context.dispatch(Constants.RENAME_ENTITY_START, {});
  API.patch(endpoint, params).then((res) => {
      const {data, errors} = res.body;
      if (data) {
        setIsRenamingEntity(null);
        if (entityType === 'folder') {
          fetchFoldersTree();
        } else {
          getFolderContent();
        }
        return context.dispatch(Constants.RENAME_ENTITY_SUCCESS, {});
      }
      return context.dispatch(Constants.RENAME_ENTITY_FAIL, errors);
    })
    .catch((err) => {
      return context.dispatch(Constants.RENAME_ENTITY_FAIL, err);
    });
}

export function setIsRenamingEntity(payload) {
  processOperation({
    operation: Constants.SET_IS_RENAMING_ENTITY,
    params: payload
  });
}

export function setDeleteContent(payload) {
  processOperation({
    operation: Constants.CREATE_DELETE_CONTENT,
    params: payload
  });
}

function areSelections() {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const selectedEntities =
    context.evaluate(getOperations(entityGroup, 'selectedEntities'));

  if (selectedEntities && selectedEntities.size) {
    return true;
  }

  return false;
}

export function deleteEntities() {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const selectedEntities = context.evaluate(getOperations('modals', ['delete', 'content']));
  const folders = [];
  const items = [];

  selectedEntities.map((entity) => {
    if (entity.get('type') === 'folder') {
      folders.push(entity.get('id'));
    } else {
      items.push(entity.get('id'));
    }
  });

  API.patch(API.endpoints.genericDeleteEntities, {
    entityGroup, folders, items
  }).then((res) => {
      const { data, errors } = res.body;
      invokeDeleteModal();
      if (data) {
        actions.notifications.genericActionSuccess(data);

        if (areSelections()) {
          selectAllEntities();
        }

        if (entityGroup === 'topics') {
          getFolderContent();
        } else {
          fetchFoldersTree();
        }

      } else {
        actions.notifications.genericActionFailed(errors);
        loadEntityFailed(Constants.ENTITY_CONTENT_DATA, errors);
      }
    })
    .catch((err) => loadEntityFailed(Constants.ENTITY_CONTENT_DATA, err));
}

export function duplicateEntity(payload) {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const params = {
    entityGroup: entityGroup,
    id: payload
  };

  API.post(API.endpoints.genericDuplicateEntity, params).then((res) => {
      const {data, errors} = res.body;

      if (data) {
        fetchFoldersTree();
      } else {
        loadEntityFailed(Constants.ENTITY_CONTENT_DATA, errors);
      }
    })
    .catch((err) => loadEntityFailed(Constants.ENTITY_CONTENT_DATA, err));
}

export function filterEntities({sortBy = null, sortOrder = null, page = 1, perPage = 20 } = {}) {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const getSorting = () => context.evaluate(getOperations(entityGroup, 'sort'));

  const filters = context.evaluate(context.getters.filters.selectedFilters);

  if (sortBy === null || sortOrder === null) {
    const sorting = getSorting();

    if (sorting) {
      sortBy = sorting.get('sortBy');
      sortOrder = sorting.get('sortOrder');
    } else {
      sortBy = 'date_created';
      sortOrder = 'desc';
    }
  }

  const dateCreatedFrom = filters.getIn(['dateCreated', 'startDate']) ?
    filters.getIn(['dateCreated', 'startDate']).format('gggg-MM-DD') : '';

  let dateCreatedTo = filters.getIn(['dateCreated', 'endDate']) ?
    filters.getIn(['dateCreated', 'endDate']).format('gggg-MM-DD') : '';

  // dateCreatedTo = dateCreatedTo === dateCreatedFrom ? '' : dateCreatedTo;

  let params = {
    sortBy,
    sortOrder
  };

  if (dateCreatedFrom !== '') {
    params.dateCreatedFrom = dateCreatedFrom;
  }

  if (dateCreatedTo !== '') {
    params.dateCreatedTo = dateCreatedTo;
  }

  toggleFilters();
  toggleActiveFilters();

  attributesOrder.forEach((item) => {
    if (filters.get(item)) {
      params[item] = filters.getIn([item, 'value']);
    }
    if (item === 'countValue') {
      params[item] = filters.get(item);
    }
  });

  params.entityGroup = entityGroup;
  params.page = page;
  params.perPage = perPage;
  params.noFolders = 1;

  isFetchingData(entityGroup, true);

  API.get(API.endpoints.genericFilterEntities, params).then((res) => {
    let { data, meta = {}, errors } = res.body;

    if (data) {
      data = data.nodes ? data.nodes : data;
      loadEntitySuccess(Constants.ENTITY_CONTENT_DATA, data, meta);
    } else {
      loadEntityFailed(Constants.ENTITY_CONTENT_DATA, errors);
    }
  }).catch((err) => loadEntityFailed(Constants.ENTITY_CONTENT_DATA, err));
}

export function searchEntities({sortBy = null, sortOrder = null, page = 1, perPage = 20, entityType = null } = {}) {
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const getSorting = () =>
    context.evaluate(getOperations(entityGroup, 'sort'));
  const query = context.evaluate(context.getters.filters.searchQuery);
  const noFolders = 1;
  const type = entityType || context.evaluate(getOperations(CURRENT_ENTITY_TYPE));

  if (sortBy === null || sortOrder === null) {
    const sorting = getSorting();

    if (sorting) {
      sortBy = sorting.get('sortBy');
      sortOrder = sorting.get('sortOrder');
    } else {
      sortBy = 'date_created';
      sortOrder = 'desc';
    }
  }
  const payload = {
    query,
    entityGroup,
    page,
    perPage,
    sortBy,
    sortOrder,
    noFolders
  };

  if (entityGroup === 'aqlfilters') {
    payload.type = type;
  }

  isFetchingData(entityGroup, true);

  API.get(API.endpoints.genericSearchEntities, payload).then((res) => {
    let { data, meta = {}, errors } = res.body;

    if (data) {
      data = data.nodes ? data.nodes : data;
      loadEntitySuccess(Constants.ENTITY_CONTENT_DATA, data, meta);
    } else {
      loadEntityFailed(Constants.ENTITY_CONTENT_DATA, errors);
    }
  }).catch((err) => loadEntityFailed(Constants.ENTITY_CONTENT_DATA, err));
}

export function setFooterBreadcrumbPath(payload) {
  processOperation({
    operation: Constants.COLLECT_BREADCRUMB_PATH,
    params: payload
  });
}

export function selectCurrentItem(id, parentIdPath) {
  processOperation({
    operation: Constants.SELECT_CONTENT_ITEM_WIDGETS,
    params: { id }
  });

  setFooterBreadcrumbPath(parentIdPath);
}

export function resetWidgets(quickFiltersPersist) {
  processOperation({
    operation: Constants.RESET_WIDGETS,
    params: {
      activeWidget: false
    }
  });

  actions.filters.clearFilters(quickFiltersPersist);
}

export function downloadReport(entity) {
  const entityType = entity.get('entityType');
  const id = (entityType === 'ticket_report') ? entity.get('mailingId') : entity.get('id');
  const getOperations = getters.entityCache.getOperationsByEntityName;
  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  const nextRoute = entityUrlBuilder();
  const downloadAction = (entityType === 'ticket_report') ? actions.reportsManager.getTicketReportsMailResultsUrl : actions.reportsManager.getCampaignReportUrl;

  const method = downloadAction(entityGroup, id);

  if (entityType === 'ticket_report') {
    nextRoute.addPart(method).addPart('?mailing_id=').addPart(id);
  } else {
    nextRoute.addPart(method).addPart('?campaign_id=').addPart(id);
  }

  return nextRoute.get();
}

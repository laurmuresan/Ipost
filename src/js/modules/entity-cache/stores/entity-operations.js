import isFunction from 'lodash/isFunction';
import { createStore, toImmutable } from 'imm-flux-utils';
import { ensureEntityExists } from '../helpers';
import * as ActionTypes from '../action-types';
import { emptyMap } from '../../../resources/empty-structures';
import * as OperationsTypes from '../operations-types';
import * as Operations from '../operations-helpers';
import { CURRENT_ENTITY_GROUP } from '../../generic-manager/constants';

const INITIAL_STATE = emptyMap;

function processOperation(currentState, { entityType, operation, params }) {
  const operations = {
    [OperationsTypes.SETUP_ENTITY]: Operations.setupEntity,
    [OperationsTypes.SELECT_TREE_ITEM]: Operations.selectFolder,
    [OperationsTypes.EXPAND_TREE_ITEM]: Operations.expandTreeFolder,
    [OperationsTypes.EXPAND_ALL_TREE_ITEMS]: Operations.expandAllTreeItems,
    [OperationsTypes.SELECT_ENTITY]: Operations.selectEntity,
    [OperationsTypes.SELECT_ALL_ENTITIES]: Operations.selectAllEntities,
    [OperationsTypes.FOCUS_ON_CREATION_WIDGET]: Operations.focusOnCreationWidget,
    [OperationsTypes.RESET_FOCUS_ON_CREATION_WIDGET]: Operations.resetFocusOnCreationWidget,
    [OperationsTypes.SET_IS_RENAMING_ENTITY]: Operations.setIsRenamingEntity,

    [OperationsTypes.TOGGLE_CREATE_FOLDER]: Operations.toggleAction,
    [OperationsTypes.TOGGLE_FILTERS]: Operations.toggleAction,
    [OperationsTypes.TOGGLE_SEARCH]: Operations.toggleAction,
    [OperationsTypes.TOGGLE_ACTIVE_FILTERS]: Operations.toggleAction,
    [OperationsTypes.RESET_WIDGETS]: Operations.toggleAction,

    [OperationsTypes.SELECT_TREE_ITEM_IN_MODAL]: Operations.selectEntityInModal,
    [OperationsTypes.TOGGLE_MOVE_MODAL_STATE]: Operations.invokeMoveModal,
    [OperationsTypes.COLLECT_ENTITY_FOR_ACTIONS]: Operations.selectEntityForAction,
    [OperationsTypes.EXPAND_MODAL_TREE_ITEM]: Operations.expandTreeInModal,
    [OperationsTypes.SELECT_REPORTS_TAB]: Operations.selectReportsTab,
    [OperationsTypes.HANDLE_SORTING]: Operations.handleSorting,
    [OperationsTypes.TOGGLE_DELETE_MODAL_STATE]: Operations.invokeDeleteModal,
    [OperationsTypes.CREATE_DELETE_CONTENT]: Operations.createDeleteContent,
    [OperationsTypes.COLLECT_BREADCRUMB_PATH]: Operations.addBreadcrumbPath,
    [OperationsTypes.SELECT_CONTENT_ITEM_WIDGETS]: Operations.selectContentItem,


  };

  entityType = entityType || currentState.get(CURRENT_ENTITY_GROUP);

  if (!operation || !isFunction(operations[operation])) {
    throw new Error('entityOperations#processOperation: `operation` is required and it has to be a `function`');
  }

  return operations[operation]({
    entityType,
    params,
    cache: currentState
  });
}

function loadHandler(cache, payload) {
  const { entityType, data } = payload;
  cache = ensureEntityExists(cache, entityType);

  return cache.set(entityType, toImmutable(data));
}

function mergeHandler(cache, payload) {
  const { entityType, data } = payload;
  cache = ensureEntityExists(cache, entityType);

  return cache.mergeIn([entityType], toImmutable(data));
}

const entityOperations = createStore(INITIAL_STATE, {
  [ActionTypes.ENTITY_OPERATIONS_MERGE]: mergeHandler,
  [ActionTypes.ENTITY_OPERATIONS_START]: loadHandler,
  [ActionTypes.PROCESS_OPERATION]: processOperation
});

export default entityOperations;

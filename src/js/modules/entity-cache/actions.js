import context, { getters } from '../../application-context';
import { createAction } from '../../create-action';
import { immutableSet } from 'imm-flux-utils';
import * as ActionTypes from './action-types';
import { CURRENT_ENTITY_GROUP } from '../generic-manager/constants';

const EMPTY_SET = immutableSet([]);

export function createOperationsEntityStore(entityType, params) {
  const initialStoreShape = {
    isFetchingData: false,
    selectedFolder: null,
    selectedFolderLabel: '',
    expandedList: EMPTY_SET,
    selectedEntities: EMPTY_SET,
    sort: {
      selectedIndex: null,
      sortBy: 'created_date',
      sortOrder: 'desc'
    }
  };

  createAction({
    type: ActionTypes.ENTITY_OPERATIONS_START,
    payload: {
      entityType,
      data: {
        ...initialStoreShape,
        ...params
      }
    }
  });
}

export function selectInitialFolder(entityType, selectedFolder, selectedFolderLabel) {
  createAction({
    type: ActionTypes.ENTITY_OPERATIONS_MERGE,
    payload: {
      entityType,
      data: { selectedFolder, selectedFolderLabel }
    }
  });
}

export function isFetchingData(entityType, bool) {
  createAction({
    type: ActionTypes.ENTITY_OPERATIONS_MERGE,
    payload: {
      entityType,
      data: {
        isFetchingData: bool
      }
    }
  });
}

export function resetOperation(entityType, params) {
  createAction({
    type: ActionTypes.RESET_OPERATION,
    meta: { entityType },
    payload: params
  });
}

export function processOperation(params, entityType) {
  createAction({
    type: ActionTypes.PROCESS_OPERATION,
    meta: { entityType },
    payload: params
  });
}

export function loadEntitySuccess(entityType, data, meta) {
  const getOperations = getters.entityCache.getOperationsByEntityName;

  if (!entityType) {
    throw new Error(`EntityCache#action#load: 'entityType' is required`);
  }

  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  entityType = `${entityGroup}:${entityType}`;

  isFetchingData(entityGroup, false);

  createAction({
    type: ActionTypes.ENTITY_FETCH_SUCCESS,
    payload: { entityType, data, meta }
  });
}

export function loadEntityFailed(entityType, data) {
  const getOperations = getters.entityCache.getOperationsByEntityName;

  if (!entityType) {
    throw new Error(`EntityCache#action#load: 'entityType' is required`);
  }

  const entityGroup = context.evaluate(getOperations(CURRENT_ENTITY_GROUP));
  entityType = `${entityGroup}:${entityType}`;

  createAction({
    type: ActionTypes.ENTITY_FETCH_FAILED,
    payload: { entityType, data }
  });
}

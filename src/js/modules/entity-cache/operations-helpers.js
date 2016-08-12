import { Entity } from '../../records';
import * as getters from './getters';
import context from '../../application-context';
import { immutableSet, toImmutable } from 'imm-flux-utils';

/**
 * Setup entity at the store level and use it later
 * @param entityType - the current entity
 * @param cache - the current state
 * @param params - params sent within the operation
 * @returns {ImmutableMap} - returns the new state
 */
export function setupEntity({ entityType, cache, params }) {
  return cache.set(entityType, params.entityType);
}

/**
 * Select a folder in the tree
 * @param entityType - the current entity
 * @param cache - the current state
 * @param params - params sent within the operation
 * @returns {ImmutableMap} - returns the new state
 */
export function selectFolder({ entityType, cache, params }) {
  return cache.withMutations((state) => {
    return state.setIn([entityType, 'selectedFolder'], params.id)
      .setIn([entityType, 'selectedFolderLabel'], params.label);
  });
}

/**
 * Expand a folder in the tree
 * @param entityType - the current entity
 * @param cache - the current state
 * @param params - params sent within the operation
 * @returns {ImmutableMap} - returns the new state
 */
export function expandTreeFolder({ entityType, cache, params }) {
  const entity = cache.get(entityType);
  const { id } = params;
  const expandedListPath = [entityType, 'expandedList'];
  const allTreeItemsExpandedPath = [entityType, 'allTreeItemsExpanded'];

  let expandedList = entity.get('expandedList');

  if (expandedList.includes(id)) {
    expandedList = expandedList.remove(id);
  } else {
    expandedList = expandedList.add(id);
  }

  return cache.withMutations((state) => state
    .setIn(allTreeItemsExpandedPath, false)
    .setIn(expandedListPath, expandedList));
}

/**
 * Expand/Collapse all folders in the tree
 * @param entityType - the current entity
 * @param cache - the current state
 * @returns {ImmutableMap} - returns the new state
 */
export function expandAllTreeItems({ entityType, cache }) {
  const entity = cache.get(entityType);
  const foldersData = context.evaluate(getters.getEntity(entityType, 'tree'));
  const allTreeItemsExpanded = entity.get('allTreeItemsExpanded');
  const expandedListPath = [entityType, 'expandedList'];
  const allTreeItemsExpandedPath = [entityType, 'allTreeItemsExpanded'];

  let expandedList = entity.get('expandedList');

  const walk = (folders) => {
    folders.forEach((folder) => {
      const id = folder.get('id');
      const children = folder.get('children');

      expandedList = expandedList.add(id);

      if (children.size) {
        walk(children);
      }
    });
  };

  walk(foldersData);

  return cache.withMutations((state) => {
    if (allTreeItemsExpanded) {
      state = state.setIn(allTreeItemsExpandedPath, false)
        .setIn(expandedListPath, expandedList.clear());
    } else {
      state = state.setIn(allTreeItemsExpandedPath, true)
        .setIn(expandedListPath, expandedList);
    }

    return state;
  });
}

/**
 * Actions used for Move Modal in general manager
 * */
export function invokeMoveModal({ entityType, cache, params }) {
  const visibility = cache.getIn(['modals', 'move', 'visibility']);
  return cache.setIn(['modals', 'move', 'visibility'], !visibility);
}

export function selectEntityInModal({ entityType, cache, params }) {
  return cache.withMutations((state) => state
    .setIn(['modals', 'move', 'selectedTreeEntityId'], params.id)
    .setIn(['modals', 'move', 'selectedTreeEntityLabel'], params.label));
}

export function selectEntityForAction({ entityType, cache, params }) {
  const { id, type, modalType } = params;

  if (id === '') {
    return cache.setIn(['modals', modalType, 'currentEntity'], toImmutable({}));
  }

  return cache.setIn(['modals', modalType, 'currentEntity'], new Entity({ id, type }));
}

export function expandTreeInModal({ entityType, cache, params }) {
  const currentModalCache = cache.get('modals');
  let modals = currentModalCache;
  if (!currentModalCache.getIn(['move', 'expandedList'])) {
    modals =
      currentModalCache.withMutations((state) => state
        .setIn(['move', 'allTreeItemsExpanded'], false)
        .setIn(['move', 'expandedList'], immutableSet([]))
      );
  }

  const treeState = expandTreeFolder({entityType: 'move', cache: modals, params});
  return cache.set('modals', treeState);
}

export function invokeDeleteModal({ entityType, cache, params }) {
  const visibility = cache.getIn(['modals', 'delete', 'visibility']);
  return cache.setIn(['modals', 'delete', 'visibility'], !visibility);
}

export function createDeleteContent({ entityType, cache, params }) {
  const path = [entityType, 'selectedEntities'];
  const currentEntity = cache.getIn(['modals', 'delete', 'currentEntity']);
  const selectedEntities = cache.getIn(path);
  const content = context.evaluate(getters.getEntity(entityType, 'content'));

  let deleteArray = [];

  if (params) {
    deleteArray.push({
      id: params.get('id'),
      type: params.get('entityType'),
      name: params.get('name'),
      attributes: params.get('attributes')
    });
    return cache.setIn(['modals', 'delete', 'content'], toImmutable(deleteArray));
  }

  if (currentEntity.size) {
    content.forEach((item) => {
      if (item.get('id') === currentEntity.get('id') && item.get('entityType') === currentEntity.get('type')) {
        deleteArray.push({
          id: item.get('id'),
          type: item.get('entityType'),
          name: item.get('name'),
          attributes: item.get('attributes')
        });
      }
    });
  } else {
    content.forEach((item) => {
      selectedEntities.forEach((entity) => {
        if (item.get('id') === entity.get('id') && item.get('entityType') === entity.get('type')) {
          deleteArray.push({
            id: item.get('id'),
            type: item.get('entityType'),
            name: item.get('name'),
            attributes: item.get('attributes')
          });
        }
      });
    });
  }

  return cache.setIn(['modals', 'delete', 'content'], toImmutable(deleteArray));
}

/**
 * Select a content row
 * @param entityType - the current entity
 * @param cache - the current state
 * @returns {ImmutableMap} - returns the new state
 */
export function selectEntity({ entityType, cache, params }) {
  const { id, type } = params;
  const entity = new Entity({id, type});
  const path = [entityType, 'selectedEntities'];
  let selectedEntities = cache.getIn(path);

  if (!selectedEntities) {
    selectedEntities = immutableSet();
  }

  if (selectedEntities.contains(entity)) {
    selectedEntities = selectedEntities.remove(entity);
  } else {
    selectedEntities = selectedEntities.add(entity);
  }

  return cache.setIn(path, selectedEntities);
}

export function selectAllEntities({ entityType, cache, params }) {
  const { content } = params;
  const path = [entityType, 'selectedEntities'];
  let selectedEntities = cache.getIn(path);

  if (!selectedEntities) {
    selectedEntities = immutableSet();
  }

  const contentSize = content.size;
  const selectedSize = selectedEntities.size;

  if (selectedSize > 0 || contentSize === selectedSize) {
    cache = cache.setIn(path, selectedEntities.clear());
  } else {
    cache = cache.withMutations((state) => {
      const selected = content.map((item) => {
        const id = item.get('id');
        const type = item.get('entityType');

        return new Entity({id, type});
      });

      return state.setIn(path, selected.toSet());
    });
  }

  return cache;
}

export function selectReportsTab({ entityType, cache, params }) {
  return cache.get('activeReportsTab') === params.activeTab ?
    cache.set('activeReportsTab', false) :
    cache.set('activeReportsTab', params.activeTab);
}

export function toggleAction({ entityType, cache, params }) {
  return cache.set('activeWidget', params.activeWidget);
  //cache.get('activeWidget') === params.activeWidget ?
  //  cache.set('activeWidget', false) :
  //  cache.set('activeWidget', params.activeWidget);
}

export function handleSorting({ entityType, cache, params }) {
  return cache.setIn([entityType, 'sort'], toImmutable(params));
}

export function focusOnCreationWidget({ cache }) {
  return cache.set('focusInEntityCreatorWidget', true);
}

export function resetFocusOnCreationWidget({ cache }) {
  return cache.set('focusInEntityCreatorWidget', false);
}

export function setIsRenamingEntity({ cache, params }) {
  return cache.set('isRenamingEntity', toImmutable(params));
}

export function selectContentItem({ entityType, cache, params}) {
  return cache.setIn([entityType, 'selectedIdSearchFilter'], toImmutable(params.id));
}

export function addBreadcrumbPath({entityType, cache, params }) {
  return cache.setIn([entityType, 'breadcrumbPath'], toImmutable(params));
}

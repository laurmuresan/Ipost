import { createStore, toImmutable } from 'imm-flux-utils';
import { ensureEntityExists } from '../helpers';
import * as ActionTypes from '../action-types';
import { emptyMap } from '../../../resources/empty-structures';

const INITIAL_STATE = emptyMap;
const entityTypeSeparator = ':';

function loadHandler(cache, payload) {
  let { entityType, data, meta } = payload;

  const entityPath = entityType.split(entityTypeSeparator);
  const [ entityRoot ] = entityPath;

  cache = ensureEntityExists(cache, entityRoot);
  return cache.withMutations((state) => {
    state.setIn(entityPath, toImmutable(data));

    if (meta) {
      state.setIn([entityRoot, 'meta'], toImmutable(meta));
    }

    return state;
  });
}

// Not used at this point, uncomment them when needed
//function removeHandler(cache, payload) {
//  return cache;
//}
//
//function updateHandler(cache, payload) {
//  return cache;
//}

const entityCache = createStore(INITIAL_STATE, {
  [ActionTypes.ENTITY_FETCH_SUCCESS]: loadHandler
});

export default entityCache;

import { toImmutable } from 'nuclear-js';

export const ensureEntityExists = (cache, entityType) => {
  if (!cache.has(entityType)) {
    cache = cache.set(entityType, toImmutable({}));
  }

  return cache;
};

export const createRootFolder = (name, data = []) => {
  return [{
    name,
    id: 0,
    leaves: [],
    folder: true,
    nodes: data,
    parentIdPath: null
  }];
};

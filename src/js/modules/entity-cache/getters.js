import isArray from 'lodash/isArray';

const entityCache = 'entityCache';
const entityOperations = 'entityOperations';
const handler = (data) => data;

// TODO: merge those 2 getters into one
export function getEntity(entityType, path) {
  const rootPath = [entityCache, entityType];

  if (!entityType) {
    throw new Error(`EntityCache#getters#getById requires at least a 'entityType'`);
  }

  if (!path) {
    return [rootPath, handler];
  }

  if (isArray(path)) {
    return [[...rootPath, ...path], handler];
  }

  return [[...rootPath, path], handler];
}

export function getOperationsByEntityName(entityType, path) {
  const rootPath = [entityOperations, entityType];

  if (!entityType) {
    throw new Error(`EntityCache#getters#getOperationByEntityName requires at least a 'entityType'`);
  }

  if (!path) {
    return [rootPath, handler];
  }

  if (isArray(path)) {
    return [[...rootPath, ...path], handler];
  }

  return [[...rootPath, path], handler];
}

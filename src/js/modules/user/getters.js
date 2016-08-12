import isArray from 'lodash/isArray';

const userCapabilities = ['user', 'capabilities'];
const handler = (data) => data;

export function getCapability(path) {
  if (!isArray(path)) {
    throw new Error(`User#getters#getCapability 'path' should be an Array`);
  }

  return [
    [...userCapabilities, ...path],
    handler
  ];
}

export function getAllCapabilities() {
  return [
    userCapabilities,
    handler
  ];
}

export const hasCapabilitiesLoaded = [
  userCapabilities,
  (capabilities) => capabilities && capabilities.size
];

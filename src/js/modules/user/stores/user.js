import { createStore, toImmutable } from 'imm-flux-utils';
import * as ActionTypes from '../action-types';

const INITIAL_STATE = {
  capabilities: {}
};

function onCapabilitiesSuccess(state, payload) {
  if (!payload) {
    return state;
  }

  return state.set('capabilities', toImmutable(payload));
}

const userStore = createStore(INITIAL_STATE, {
  [ActionTypes.ON_CAPABILITIES_SUCCESS]: onCapabilitiesSuccess
});

export default userStore;

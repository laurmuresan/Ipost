import { Store, toImmutable, Immutable } from 'nuclear-js';
import { TRANSITION_TO } from '../action-types';

const toImmutableSet = Immutable.Set;

const initialState = toImmutable({
  currentPath: '/dashboard/',
  activeItems: toImmutableSet([])
});

class GlobalLeftNavStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(TRANSITION_TO, setCurrentPath);
  }
}

export default new GlobalLeftNavStore();

function setCurrentPath(currentState, payload) {
  console.log('GlobalLeftNavStore', payload);
  return currentState.set('currentPath', payload.nextRoute);
}

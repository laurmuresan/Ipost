import { Store, toImmutable } from 'nuclear-js';
import { TRANSITION_TO } from '../action-types';

const initialState = toImmutable({
  route: '/',
  routerCount: null
});

class RouterStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(TRANSITION_TO, transitionTo);
  }
}

export default new RouterStore();

function transitionTo(prevState, payload) {
  let routerCount = prevState.toJS().routerCount !== null ? (prevState.toJS().routerCount + 1) : 0;

  const { nextRoute } = payload;

  const data = {
    route: nextRoute,
    routerCount: routerCount
  };

  const nextState = prevState.merge(prevState, toImmutable(data));

  if (!nextRoute && prevState.equals(nextState)) {
    return prevState;
  }

  return nextState;
}

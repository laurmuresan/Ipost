import { Store, toImmutable } from 'nuclear-js';
import * as ActionTypes from '../action-types';

const initialState = toImmutable({
  value: null
});

class SearchingStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(ActionTypes.FILTER, filter);
  }
}
export default new SearchingStore();

function filter(state, payload){
  const nextState = state.set('value', payload.value);
  if (state.equals(nextState)) {
    return state;
  }
  return nextState;
}


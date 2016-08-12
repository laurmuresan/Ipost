import { Store, toImmutable } from 'nuclear-js';
import * as ActionTypes from '../action-types';

const initialState = toImmutable({
  slider: {
    min: 1,
    max: 125,
    values: [25, 50, 75, 100]
  }
});


class PlaygroundStore extends Store {
  getInitialState() {
    return initialState;
  }

  initialize() {
    this.on(ActionTypes.SLIDER_CHANGE, sliderChange);
  }
}

export default new PlaygroundStore();

function sliderChange(state, payload) {
  const values = payload.map((value) => {
    return { value };
  });

  return state.setIn(['slider', 'values'], toImmutable(values));
}

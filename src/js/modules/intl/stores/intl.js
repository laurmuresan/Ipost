import { Store, toImmutable } from 'nuclear-js';
import { GET_LANG_SUCCESS } from '../action-types';

class IntlStore extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(GET_LANG_SUCCESS, setLanguageFile);
  }
}

function setLanguageFile(state, payload) {
  return toImmutable(payload);
}

const INSTANCE = new IntlStore();
export default INSTANCE;

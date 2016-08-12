import { Store, toImmutable } from 'nuclear-js';
import {
  //COLLAPSE_ALL
} from '../action-types';

class TemplatesStore extends Store {
  getInitialState() {
    return toImmutable({
      templates: []
    });
  }

  initialize() {
    //this.on(COLLAPSE_ALL, collapseAll);
  }
}

export default new TemplatesStore();

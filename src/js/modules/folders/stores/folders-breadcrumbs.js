import { Store, toImmutable } from 'nuclear-js';
import {
  UPDATE_SORT_METHOD,
  SHOW_BREADCRUMBS,
  SET_BOTTOM_BREADCRUMBS_TARGET
} from '../action-types';

const initialState = toImmutable({
  currentSortMethod: {
    sortBy: 'created_date',
    sortOrder: 'desc'
  },
  showBreadcrumbs: true,
  bottomGridBreadCrumbsTarget: null
});

class FoldersBreadcrumbsStore extends Store{
  getInitialState(){
    return initialState;
  }

initialize(){
    this.on(UPDATE_SORT_METHOD, updateSortMethod);
    this.on(SHOW_BREADCRUMBS, showBreadcrumbs);
    this.on(SET_BOTTOM_BREADCRUMBS_TARGET, setBottomBreadcrumbsTarget);
  }
}

export default new FoldersBreadcrumbsStore();

function updateSortMethod(state, payload){
  const { sortBy, sortOrder } = payload;
  return state.set('currentSortMethod', toImmutable({ sortBy, sortOrder }));
}

function showBreadcrumbs(state, payload){
  return state.set('showBreadcrumbs', toImmutable(payload));
}

function setBottomBreadcrumbsTarget(state, payload) {
  return state.set('bottomGridBreadCrumbsTarget', toImmutable(payload));
}

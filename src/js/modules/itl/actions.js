import {
  RESET_ITL,
  CHANGE_PERSONALIZE_TAGS_PANEL_PROPERTIES,
  GET_ITL_MACROS_START,
  GET_ITL_MACROS_SUCCESS,
  GET_ITL_MACROS_FAIL,
  SET_CKEDITOR_MODE
} from './action-types';
import context from '../../application-context';
import DataProvider from '../../data-provider';

const API = new DataProvider();

export function resetITL() {
  context.dispatch(RESET_ITL);
}

export function changeProperties(payload) {
  context.dispatch(CHANGE_PERSONALIZE_TAGS_PANEL_PROPERTIES, payload);
}

export function getItlMacros() {
  context.dispatch(GET_ITL_MACROS_START);

  API.get(API.endpoints.getSettingsDatabaseItlTable).then((res) => {
    const { data, errors } = res.body;
    if (data) {
      return context.dispatch(GET_ITL_MACROS_SUCCESS, data);
    }
    return context.dispatch(GET_ITL_MACROS_FAIL, errors);
  }).catch((err) => {
    return context.dispatch(GET_ITL_MACROS_FAIL, err);
  });
}

export function setCKEditorMode(payload) {
  context.dispatch(SET_CKEDITOR_MODE, payload);
}

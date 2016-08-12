import { createAction } from '../../create-action';
import * as ActionTypes from './action-types';

export function setNewFolderError(payload) {
  createAction({type: ActionTypes.CREATE_FOLDER_FAILED, payload});
}

export function setNewTemplateFolderError(payload) {
  createAction({type: ActionTypes.CREATE_TEMPLATE_FOLDER_FAIL, payload});
}

export function setTextEmailNameError(payload) {
  createAction({type: ActionTypes.CREATE_TEXT_EMAIL_FAIL, payload});
}

export function setHTMLEmailNameError(payload) {
  createAction({type: ActionTypes.CREATE_HTML_EMAIL_FAIL, payload});
}

export function genericActionSuccess(payload) {
  createAction({type: ActionTypes.GENERIC_ACTION_SUCCESS, payload});
}

export function genericActionFailed(payload) {
  createAction({type: ActionTypes.GENERIC_ACTION_FAILED, payload});
}

export function showCreationNotifications(payload) {
  createAction({type: ActionTypes.CREATION_NOTIFICATION, payload});
}

export function resetNotifications() {
  createAction({type: ActionTypes.RESET_NOTIFICATIONS, payload: {}});
}

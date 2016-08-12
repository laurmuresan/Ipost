import { createStore, toImmutable } from 'imm-flux-utils';
import {
  CREATE_FOLDER_FAILED,
  RESET_NOTIFICATIONS,
  GENERIC_ACTION_SUCCESS,
  GENERIC_ACTION_FAILED,
  CREATION_NOTIFICATION
} from '../action-types';

const INITIAL_STATE = {
  entityCreateNewFolder: '',
  renameEntity: '',
  emailManager: {
    folderNameError: {},
    nameError: {}
  },
  templateManager: {
    folderNameError: {},
    nameError: {}
  },
  sectionManager: {
    nameError: {}
  },
  templatePublishingNotifications: [],
  headersAndFooters: [],
  client: [],
  contentTextFile: [],
  contentHtmlFile: [],
  clientEditContact: [],
  sendTestMail: [],
  deliveryManagementSuccesMessage: [],
  deliveryManagementGlobalErrorMessage: [],
  userProfileAvatarSuccesMessage: [],
  userProfileAvatarGlobalErrorMessage: [],
  webAnalytics: [],
  genericActionNotification: [],
  creationNotification: []
};

function setNewFolderError(state, payload) {
  const error = payload[0];
  return state.setIn(['emailManager', 'folderNameError'], toImmutable(error));
}

function setTextEmailNameError(state, payload) {
  const error = payload[0];
  return state.setIn(['emailManager', 'nameError'], toImmutable(error));
}

function setHTMLEmailNameError(state, payload) {
  const error = payload[0];
  return state.setIn(['emailManager', 'nameError'], toImmutable(error));
}

function setNewTemplateFolderError(state, payload) {
  const error = payload[0];
  return state.setIn(['templateManager', 'folderNameError'], toImmutable(error));
}

function setTemplateNameError(state, payload) {
  const error = payload[0];
  return state.setIn(['templateManager', 'nameError'], toImmutable(error));
}

function setSectionNameError(state, payload) {
  const error = payload[0];
  return state.setIn(['sectionManager', 'nameError'], toImmutable(error));
}

function setRenameEntityError(state, payload) {
  const error = payload[0].detail;
  return state.set('renameEntity', toImmutable(error));
}

function setEentityCreateNewFolderError(state, payload) {
  const error = payload[0];
  return state.set('entityCreateNewFolder', toImmutable(error));
}

function setSuccessPublish(state){
  return state.set('templatePublishingNotifications', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Published Successfully',
    message: 'The template has been published.',
    timeOut: 6000
  }]));
}
function setSuccessUnpublish(state){
  return state.set('templatePublishingNotifications', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Unpublished Successfully',
    message: 'The template has been unpublished.',
    timeOut: 3000
  }]));
}

function setFailPublishUnpublish(state, payload){
  const data = payload[0];

  return state.set('templatePublishingNotifications', toImmutable([{
    id: 1,
    type: 'error',
    title: data.title,
    message: data.description,
    timeOut: 3000
  }]));
}

function setSuccesAddContent(state) {
  return state.set('headersAndFooters', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Success',
    message: 'Successfully Added Content',
    timeOut: 3000
  }]));
}

function setFailAddContent(state) {
  return state.set('headersAndFooters', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Error',
    message: 'Could not add content to your email section',
    timeOut: 3000
  }]));
}

function setSuccesClientSave(state) {
  return state.set('client', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Success',
    message: 'Successfully Saved Client Data.',
    timeOut: 6000
  }]));
}

function setFailClientSave(state) {
  return state.set('client', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Error',
    message: 'Failed To Save Client Data. Please check for field errors.',
    timeOut: 6000
  }]));
}

function setSuccesContentUploadTextFile(state) {
  return state.set('contentTextFile', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Upload text file',
    message: `Your text file has been uploaded successfully.`,
    timeOut: 6000
  }]));
}

function setFailContentUploadTextFile(state) {
  return state.set('contentTextFile', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Upload text file',
    message: 'Failed to upload your text file. Please try again.',
    timeOut: 6000
  }]));
}

function setSuccesContentUploadHtmlFile(state) {
  return state.set('contentHtmlFile', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Upload html/text file',
    message: 'Your file has been uploaded successfully.',
    timeOut: 6000
  }]));
}

function setFailContentUploadHtmlFile(state) {
  return state.set('contentHtmlFile', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Upload html/text file',
    message: 'Failed to upload your file. Please try again.',
    timeOut: 6000
  }]));
}

function setSuccessSettingsClientEditContact(state) {
  return state.set('clientEditContact', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Edit Contact Info',
    message: 'Successfully saved contact info data.',
    timeOut: 6000
  }]));
}

function setFail1SettingsClientEditContact(state) {
  return state.set('clientEditContact', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Edit Contact Info',
    message: 'Failed to save your contact info data. Please try again.',
    timeOut: 6000
  }]));
}

function setFail2SettingsClientEditContact(state) {
  return state.set('clientEditContact', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Edit Contact Info',
    message: 'Failed to save your contact info data. Please try again.',
    timeOut: 6000
  }]));
}

function setSuccessSendTestMailing(state) {
  return state.set('sendTestMail', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Send Test Mailing',
    message: 'Your test email was successfully sent.',
    timeOut: 6000
  }]));
}

function setFailSendTestMailing(state) {
  return state.set('sendTestMail', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Send Test Mailing',
    message: 'Failed to send your test email. Please try again.',
    timeOut: 6000
  }]));
}

function setSuccessWebAnalytics(state) {
  return state.set('webAnalytics', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Save Web-Analytics Data',
    message: 'Web-Analytics settings were successfully saved.',
    timeOut: 6000
  }]));
}

function setFailWebAnalytics(state) {
  return state.set('webAnalytics', toImmutable([{
    id: 1,
    type: 'error',
    title: 'Save Web-Analytics Data',
    message: 'Failed to save your Web-Analytics settings.',
    timeOut: 6000
  }]));
}

function saveDeliveryManagementDataSuccess(state, payload) {
  return state.set('deliveryManagementSuccesMessage', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Send Delivery Management Success',
    message: payload.success,
    timeOut: 6000
  }]));
}

function uploadImageProfileSuccess(state, payload) {
  return state.set('userProfileAvatarSuccesMessage', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Upload User Avatar Success',
    message: 'Image uploaded succesfully',
    timeOut: 6000
  }]));
}

function deleteUserAvatarSuccess(state, payload) {
  return state.set('userProfileAvatarSuccesMessage', toImmutable([{
    id: 1,
    type: 'success',
    title: 'Delete User Avatar Success',
    message: payload.details,
    timeOut: 6000
  }]));
}

function uploadImageProfileGlobalError(state, payload) {
  let userProfileAvatarGlobalErrorMessage = state.get('userProfileAvatarGlobalErrorMessage');
  let newArr = userProfileAvatarGlobalErrorMessage.push({
    id: payload.id,
    type: 'error',
    title: 'Upload User Avatar Error',
    message: payload.error,
    timeOut: 6000
  });
  return state.set('userProfileAvatarGlobalErrorMessage', toImmutable(newArr));
}

function saveDeliveryManagementGlobalError(state, payload) {
  let deliveryManagementGlobalErrorMessage = state.get('deliveryManagementGlobalErrorMessage');
  let newArr = deliveryManagementGlobalErrorMessage.push({
    id: payload.id,
    type: 'error',
    title: 'Send Delivery Management Error',
    message: payload.error,
    timeOut: 6000
  });
  return state.set('deliveryManagementGlobalErrorMessage', toImmutable(newArr));
}

function genericActionFailed(state, errors) {
  const { title, detail, timeOut } = errors[0];
  const notification = toImmutable([{
    id: 1,
    type: 'error',
    title,
    message: detail,
    timeOut: timeOut || 3000
  }]);
  return state.set('genericActionNotification', notification);
}

function genericActionSuccess(state, payload) {
  //TODO: Discuss with backend to send specific success message for each manager or
  //TODO: Add a message generator based on entity group and type of action
  //const { title, detail, timeOut } = payload[0];
  // const notification = toImmutable(payload || [{
  const notification = toImmutable([{
    id: 1,
    type: 'success',
    title: 'Success',
    message: 'Your updates have been successfully saved',
    timeOut: 3000
  }]);

  return state.set('genericActionNotification', notification);
}

function setEentityCreateNewFolderSuccess(state) {
  const notification = toImmutable([{
    id: 1,
    type: 'success',
    title: 'Success',
    message: 'New folder created successfully',
    timeOut: 3000
  }]);

  return state.set('genericActionNotification', notification);
}

function setRenameEntitySuccess(state) {
  const notification = toImmutable([{
    id: 1,
    type: 'success',
    title: 'Success',
    message: 'Item renamed successfully',
    timeOut: 3000
  }]);

  return state.set('genericActionNotification', notification);
}

function showCreationNotifications(state, payload) {
  const { notification } = payload;
  const notificationList = state.get('creationNotification');
  const listSize = notificationList.size;
  /** set notifications to have different ids in the page
   * */
  notification.id = listSize + 1;
  const notif = notificationList.push(notification);

  return state.set('creationNotification', notif);
}

function resetStore() {
  return toImmutable(INITIAL_STATE);
}

const notificationStore = createStore(INITIAL_STATE, {
  [RESET_NOTIFICATIONS]: resetStore,
  [CREATE_FOLDER_FAILED]: setNewFolderError,
  [GENERIC_ACTION_SUCCESS]: genericActionSuccess,
  [GENERIC_ACTION_FAILED]: genericActionFailed,
  [CREATION_NOTIFICATION]: showCreationNotifications
});

export default notificationStore;

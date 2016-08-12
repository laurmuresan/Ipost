import { createAction } from '../../create-action';
import DataProvider from '../../data-provider';
import * as ActionTypes from './action-types';

const API = new DataProvider();

export function fetchCapabilities() {
  API.get(API.endpoints.capabilities)
    .then((response) => {
      if (response.body && response.body.data) {
        onCapabilitiesSuccess(response.body.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function onCapabilitiesSuccess(data) {
  createAction({
    type: ActionTypes.ON_CAPABILITIES_SUCCESS,
    payload: data
  });
}

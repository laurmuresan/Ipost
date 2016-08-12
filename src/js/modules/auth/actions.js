import { TRANSITION_TO } from '../navigation/action-types';

import context from '../../application-context';
import DataProvider from '../../data-provider';

const API = new DataProvider();
const LOGIN_ROUTE_DESCRIPTOR = { nextRoute: '/login/' };

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

  IS_LOGGED_IN_SUCCESS,
  IS_LOGGED_IN_FAILED,

  RESET_PASSWORD_LINK_START,
  RESET_PASSWORD_LINK_SUCCESS,
  RESET_PASSWORD_LINK_FAILED,

  VALIDATE_TOKEN_START,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILED,

  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED
} from './action-types';


export function login(params) {
  context.dispatch(LOGIN_START, {});

  API.authenticate(params).then((res) => {
    const { data, errors } = res.body;

    if (data) {
      validateSession();
      return context.dispatch(LOGIN_SUCCESS, res.body);
    }

    return context.dispatch(LOGIN_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(LOGIN_FAILED, err);
  });
}

export function logout() {
  context.dispatch(LOGOUT_START, {});

  API.deauthenticate().then((res) => {
    const { data, errors } = res.body;

    if (data) {
      return context.batch(() => {
        context.dispatch(LOGOUT_SUCCESS, res.body);
        context.dispatch(TRANSITION_TO, LOGIN_ROUTE_DESCRIPTOR);
      });
    }

    return context.dispatch(LOGOUT_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(LOGOUT_FAILED, err);
  });
}

export function onValidateSessionSuccess(payload) {
  context.dispatch(IS_LOGGED_IN_SUCCESS, payload);
}

export function onValidateSessionFailed(payload) {
  context.dispatch(IS_LOGGED_IN_FAILED, payload);
}

export function validateSession() {
  API.validateSession().then((res) => {
    const { data, errors } = res.body;

    if (data) {
      onValidateSessionSuccess(res.body);
    }

    if (errors) {
      onValidateSessionFailed(errors);
    }
  }).catch((err) => {
      onValidateSessionFailed(err);
  });
}

export function resetPassword(params) {
  context.dispatch(RESET_PASSWORD_LINK_START, {});

  API.post(API.endpoints.resetPassword, params).then((res) => {
    const { data, errors } = res.body;

    if (data) {
      return context.batch(() => {
        context.dispatch(RESET_PASSWORD_LINK_SUCCESS, { ...res.body, ...params });
        context.dispatch(TRANSITION_TO, LOGIN_ROUTE_DESCRIPTOR);
      });
    }

    return context.dispatch(RESET_PASSWORD_LINK_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(RESET_PASSWORD_LINK_FAILED, err);
  });
}

export function validateToken(params) {
  context.dispatch(VALIDATE_TOKEN_START, {});

  API.get(API.endpoints.validateToken + params).then((res) => {
    const { data, errors } = res.body;

    if (data) {
      return context.dispatch(VALIDATE_TOKEN_SUCCESS, res.body);
    }

    return context.dispatch(VALIDATE_TOKEN_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(VALIDATE_TOKEN_FAILED, err);
  });
}

export function updatePassword(params) {
  context.dispatch(UPDATE_PASSWORD_START, {});

  API.post(API.endpoints.updatePassword, params).then((res) => {
    const { data, errors } = res.body;

    if (data) {
      return context.batch(() => {
        context.dispatch(UPDATE_PASSWORD_SUCCESS, res.body);
        context.dispatch(TRANSITION_TO, LOGIN_ROUTE_DESCRIPTOR);
      });
    }

    return context.dispatch(UPDATE_PASSWORD_FAILED, errors);
  }).catch((err) => {
    return context.dispatch(UPDATE_PASSWORD_FAILED, err);
  });
}

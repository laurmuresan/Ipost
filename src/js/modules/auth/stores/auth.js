import { createStore, toImmutable } from 'imm-flux-utils';
import * as ActionTypes from '../action-types';

const INITIAL_STATE = {
  user: {
    clientId: '1212',
    label: 'ioio',
    errors: ''
  },
  forgot: {
    errors: []
  },
  validToken: true,
  updatePassword: {}
};

function login(state, payload) {
  const nextState = toImmutable({ user: payload.data });

  if (nextState.size && !nextState.equals(state)) {
    return nextState;
  }

  return state;
}

function loginFailed(state, payload) {
  const nextState = toImmutable({ user: {'errors': payload}});

  if (nextState.size && !nextState.equals(state)) {
    return nextState;
  }

  return state;
}

function logout(state, payload, initialState) {
  return initialState;
}

function validateSession(state, payload) {
  const nextState = toImmutable({ user: payload.data });

  if (nextState.size && !nextState.equals(state)) {
    return nextState;
  }

  return state;
}

function resetPasswordSuccess(prevState, payload) {
  const resetInformation = { ...payload.data, ...payload };

  const nextState = prevState.set('forgot', resetInformation);

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

function resetPasswordFailed(prevState, payload) {
  const nextState = prevState.set('forgot', payload.body);

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

function validateTokenStart(prevState, payload) {
  const nextState = prevState.set('validToken', {loading: true});

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

function validateTokenSuccess(prevState, payload) {
  const nextState = prevState.set('validToken', payload.data);

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

function validateTokenFailed(prevState, payload) {
  const nextState = prevState.set('validToken', payload.body);

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

function updatePasswordSuccess(prevState, payload) {
  const nextState = prevState.set('updatePassword', payload.data);

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

function updatePasswordFailed(prevState, payload) {
  const nextState = prevState.set('updatePassword', payload.body);

  if (nextState.size && !nextState.equals(prevState)) {
    return nextState;
  }

  return prevState;
}

const authStore = createStore(INITIAL_STATE, {
  [ActionTypes.LOGIN_SUCCESS]: login,
  [ActionTypes.LOGIN_FAILED]: loginFailed,
  [ActionTypes.LOGOUT_SUCCESS]: logout,
  [ActionTypes.IS_LOGGED_IN_SUCCESS]: validateSession,
  [ActionTypes.RESET_PASSWORD_LINK_SUCCESS]: resetPasswordSuccess,
  [ActionTypes.RESET_PASSWORD_LINK_FAILED]: resetPasswordFailed,
  [ActionTypes.VALIDATE_TOKEN_START]: validateTokenStart,
  [ActionTypes.VALIDATE_TOKEN_SUCCESS]: validateTokenSuccess,
  [ActionTypes.VALIDATE_TOKEN_FAILED]: validateTokenFailed,
  [ActionTypes.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,
  [ActionTypes.UPDATE_PASSWORD_FAILED]: updatePasswordFailed,
});

export default authStore;

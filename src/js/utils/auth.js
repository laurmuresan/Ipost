import context, { getters } from '../application-context';
import { createAction } from '../create-action';

export function isAuthenticatedUser() {
  return context.evaluate(getters.auth.user).get('clientId');
}

export function hasCapabilitiesLoaded() {
  return context.evaluate(getters.user.hasCapabilitiesLoaded);
}

export function logout(nextState, replace) {
  createAction({ type: 'LOGOUT' });
  context.reset();
  replace('/login/');
}

export function redirectIfAuthenticated(nextState, replace) {
  if (isAuthenticatedUser()) {
    replace('/dashboard/');
  }
}

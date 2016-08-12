import { Route } from 'react-router';
import { actions } from '../application-context';
import { isAuthenticatedUser, hasCapabilitiesLoaded } from '../utils/auth';

class AuthRoute extends Route {
  static displayName = 'AuthRoute';

  static defaultProps = {
    onEnter(nextState, replace, callback) {
      const nextPathname = nextState.location.pathname;
      const isAuthenticated = isAuthenticatedUser();
      const hasCapabilities = hasCapabilitiesLoaded();

      if (!isAuthenticated) {
        replace({
          pathname: '/login/',
          state: { nextPathname }
        });

        return callback();
      }

      if (!hasCapabilities) {
        actions.user.fetchCapabilities();
        callback();
      }

      callback();
    }
  };
}

export default AuthRoute;

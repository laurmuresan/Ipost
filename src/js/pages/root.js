import React, { Component, PropTypes } from 'react';
import context from '../application-context';
import ApplicationContainer from '../components/application-container';

class Root extends Component {
  static displayName = 'Root';

  static childContextTypes = {
    location: PropTypes.object
  };

  getChildContext() {
    const { location, routes } = this.props;
    const { title = '' } = routes[routes.length - 1];

    return {
      // TODO: we should create a router object in the future
      location: {
        ...location,
        title
      }
    };
  }

  render() {
    const { children } = this.props;
    const Provider = context.Provider;

    return (
      <Provider reactor={context}>
        <ApplicationContainer>
          {children}
          <div ref='Overlays' id='overlays'>
            <div id='overlay-1'/>
            <div id='overlay-2'/>
          </div>
        </ApplicationContainer>
      </Provider>
    );
  }
}

export default Root;

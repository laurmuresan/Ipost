import React, { Component, PropTypes } from 'react';
import context from '../application-context';

class ApplicationContainer extends Component {
  static displayName = 'ApplicationContainer';

  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object
  };

  static getDataBindings(getters) {
    return {
      layout: getters.layout.layout
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { router } = this.context;
    const { getters } = context;

    context.observe(getters.navigation.router, (routerStore) => {
      router.push(routerStore.get('route'));
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div id='app-wrapper'>
        {children}
      </div>
    );
  }
}

const ConnectedApplicationContainer = context.connect(ApplicationContainer);
export default ConnectedApplicationContainer;

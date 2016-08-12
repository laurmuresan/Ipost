import React, { Component } from 'react';
import context, { modules, connector } from '../application-context';

const dataBindingsSpec = {
  auth: modules.auth.getters.user
};

export default (ToBeRendered) => {
  @connector((props) => dataBindingsSpec)
  class RequireAuth extends Component {
    static displayName = 'RequireAuth';

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.user = context.evaluate(modules.auth.getters.user).get('clientId');
      if (!this.user) {
        this.props.history.replaceState(null, '/login');
      }
    }

    render() {
      return <ToBeRendered {...this.props}/>;
    }
  }

  return RequireAuth;
};

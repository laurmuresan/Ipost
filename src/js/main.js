import React from 'react';
import { render } from 'react-dom';
import ErrorHandler from './error-handler';
import ApplicationSession from './application-session';
import { browserHistory } from 'react-router';
import { initializeRouter } from './router';
import context, { actions } from './application-context';
import { default as config } from './resources/config';
import request from './request';
import DataProvider from './data-provider';
import { Dashboard } from './pages/dashboard';

const API = new DataProvider();
const applicationSession = new ApplicationSession();

class Main {
  constructor() {
    this.config = config;
    this.version = process.env.VERSION;
    this.mountNode = document.getElementById('root');
  }

  authCheck() {
    return API.validateSession();
  }

  getCapabilities() {
    return API.get(API.endpoints.capabilities);
  }

  noticeCheck() {
    if (!this.noticeTimer) {
      actions.notices.getNewSystemNotices();

      //300000 = 5 mins, in case this is customisable, it can be updated
      this.noticeTimer = window.setInterval(() => {
        actions.notices.getNewSystemNotices();
      }, 300000);
    }
  }

  onAuthenticated(data) {
    actions.auth.onValidateSessionSuccess(data);
  }

  onNotAuthenticated(data) {
    actions.auth.onValidateSessionFailed(data);
    this.mount();
  }

  onGetCapabilitiesSuccess(response) {
    actions.user.onCapabilitiesSuccess(response.body.data);
    this.mount();
  }

  onGetCapabilitiesFailed(response) {
    // TODO: treat error on getting capabilities, it shouldn't render the application
    console.error(response);
    this.renderLoading('Error');
  }

  /*renderLoading(message = 'Initializing...') {
    this.mount(<ActivityIndicator message={message} size='medium' visible/>);
  }*/

  mount(component) {
    if (!component) {
      component = this.router;
    }

    render(component, this.mountNode);
  }

  initialize(spec) {
    const dependencies = {
      capabilities: {}
    };

    ErrorHandler.fatal(
      (this.mountNode === null),
      `Main#initialize(): mount node doesn't exist`
    );

    if (spec && spec.static) {
      this.config.static = spec.static;
    }

    if (spec && spec.stores) {
      context.inject(spec.stores);
    }

    this.router = initializeRouter({
      history: browserHistory
    });

    if (context.debug) {
      this.api = API;
      this.context = context;
      this.request = request;
    }

    this.mount();
  }
}

export default Main;

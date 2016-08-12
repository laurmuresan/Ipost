import React from 'react';
import { Router } from 'react-router';
import routes from './routes';

export function initializeRouter(props) {
  return (
    <Router {...props}>{routes}</Router>
  );
}

initializeRouter.displayName = 'RouterInitializer';

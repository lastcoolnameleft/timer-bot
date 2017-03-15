// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import About from './components/About';
import Bot from './components/Bot';
import Timer from './components/Timer';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/bot" component={Bot} />
    <Route path="/timer/:name" component={Timer} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;

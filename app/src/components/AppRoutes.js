import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Router>
  );
}

export default AppRouter;

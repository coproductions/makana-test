import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignIn from './SignIn';
import { compose, withProps } from 'recompose';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" component={compose(withProps(() => ({ isSignUp: false })))(SignIn)} />
      <Route path="/signup" component={compose(withProps(() => ({ isSignUp: true })))(SignIn)} />
    </Router>
  );
}

export default AppRouter;

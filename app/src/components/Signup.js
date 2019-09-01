import { Container, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import { compose } from 'recompose';
import { useAuthStyles } from './styles';
import EmailPasswordForm from './EmailPasswordForm';
import { SIGN_UP } from '../operations';
import { useAuthMutation } from '../hooks/useAuthMutation';

function Signup(props) {
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [signup, loading] = useAuthMutation({ mutation: SIGN_UP, ...props });

  const classes = useAuthStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => signup({ variables: values })}
        submitLabel="Sign up"
        includeName={true}
        loading={loading}
      />
      <BottomNavigation className={classes.root}>
        <BottomNavigationAction component={RouterLink} to="/" label="home" />
        <BottomNavigationAction component={RouterLink} to="/login" label="login" />
      </BottomNavigation>
    </Container>
  );
}
export default compose(withRouter)(Signup);

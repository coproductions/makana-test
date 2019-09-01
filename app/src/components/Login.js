import { Typography, Container, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuthStyles } from './styles';
import EmailPasswordForm from './EmailPasswordForm';
import { LOGIN_USER } from '../operations';
import { compose } from 'recompose';
import { useAuthMutation } from '../hooks';

const Login = props => {
  const [values, setValues] = useState({ email: '', password: '', persist: 'true' });
  const [login, loading] = useAuthMutation({ mutation: LOGIN_USER, ...props });
  const classes = useAuthStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h3">Log in</Typography>
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => login({ variables: values })}
        submitLabel="log in"
        loading={loading}
      />
      <BottomNavigation className={classes.root}>
        <BottomNavigationAction showLabel component={RouterLink} to="/" label="home" />
        <BottomNavigationAction showLabel component={RouterLink} to="/signup" label="signup" />
      </BottomNavigation>
    </Container>
  );
};

export default compose(withRouter)(Login);

import { Container, Link } from '@material-ui/core';
import { useMutation, useApolloClient } from 'react-apollo';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';

import { AUTH_TOKEN } from '../constants';
import { useAuthStyles } from './styles';
import EmailPasswordForm from './EmailPasswordForm';
import { FEED_QUERY, SIGN_UP } from '../operations';

function Signup(props) {
  const client = useApolloClient();
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [signup] = useMutation(SIGN_UP, {
    onCompleted: data => {
      localStorage.setItem(AUTH_TOKEN, data.signup.token);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    },
    refetchQueries: ({ data, error }) => {
      if (data && data.login.token) {
        localStorage.setItem(AUTH_TOKEN, data.login.token);
        client.writeData({ data: { isLoggedIn: true } });
        props.history.push('/');
      }
      return [{ query: FEED_QUERY }];
    },
    onError: err => props.enqueueSnackbar(err.message, { variant: 'error' }),
  });
  const classes = useAuthStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => signup({ variables: values })}
        submitLabel="Sign up"
        includeName={true}
      />
      <Link component={RouterLink} to="/login">
        login
      </Link>{' '}
    </Container>
  );
}

export default withRouter(withSnackbar(Signup));

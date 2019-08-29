import { Container, Link } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';
import { withSnackbar } from 'notistack';
import React, { useState } from 'react';

import { AUTH_TOKEN } from '../constants';
import { useAuthStyles } from './styles';
import EmailPasswordForm from './EmailPasswordForm';
import { FEED_QUERY, LOGIN_USER } from '../operations';

const Login = props => {
  const client = useApolloClient();
  const [values, setValues] = useState({ email: '', password: '', persist: 'true' });
  const [login, { loading }] = useMutation(LOGIN_USER, {
    onError: err => props.enqueueSnackbar(err.message, { variant: 'error' }),
    refetchQueries: ({ data, error }) => {
      if (data && data.login.token) {
        localStorage.setItem(AUTH_TOKEN, data.login.token);
        client.writeData({ data: { isLoggedIn: true } });
        props.history.push('/');
      }
      return [{ query: FEED_QUERY }];
    },
  });
  const classes = useAuthStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => login({ variables: values })}
        submitLabel="log in"
        loading={loading}
      />

      <Link component={RouterLink} to="/signup">
        signup
      </Link>
    </Container>
  );
};

export default withRouter(withSnackbar(Login));

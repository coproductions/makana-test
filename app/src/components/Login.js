import { Container, Link } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';
import { withSnackbar } from 'notistack';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import { AUTH_TOKEN } from '../constants';
import { useAuthStyles } from './styles';
import EmailPasswordForm from './EmailPasswordForm';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = props => {
  const client = useApolloClient();
  const [values, setValues] = useState({ email: '', password: '', persist: 'true' });
  const [login, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: data => {
      localStorage.setItem(AUTH_TOKEN, data.login.token);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    },
    onError: err => props.enqueueSnackbar(err.message, { variant: 'error' }),
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

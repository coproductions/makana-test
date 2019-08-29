import React, { useState, useEffect } from 'react';
import { Container, Link } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { useMutation, useApolloClient } from 'react-apollo';
import EmailPasswordForm from './EmailPasswordForm';
import gql from 'graphql-tag';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { useAuthStyles } from './styles';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login(props) {
  const { cache } = useApolloClient();
  const [values, setValues] = useState({ email: '', password: '', persist: 'true' });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const classes = useAuthStyles();

  useEffect(() => {
    if (error) {
      props.enqueueSnackbar(error.message, { variant: 'error' });
    }
    if (data && data.login && data.login.token) {
      localStorage.setItem(AUTH_TOKEN, data.login.token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      props.history.push('/');
    }
  }, [error, data]);

  return (
    <Container className={classes.container} maxWidth="sm">
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => login({ variables: values })}
        submitLabel="log in"
      />
      <Link component={RouterLink} to="/signup">
        signup
      </Link>
    </Container>
  );
}

export default withRouter(withSnackbar(Login));

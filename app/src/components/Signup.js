import { Container, Link } from '@material-ui/core';
import { useMutation, useApolloClient } from 'react-apollo';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import { AUTH_TOKEN } from '../constants';
import { useAuthStyles } from './styles';
import EmailPasswordForm from './EmailPasswordForm';

const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        name
      }
    }
  }
`;

function Signup(props) {
  const client = useApolloClient();
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [signup] = useMutation(SIGN_UP, {
    onCompleted: data => {
      localStorage.setItem(AUTH_TOKEN, data.signup.token);
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

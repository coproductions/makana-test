import React, { useState, useEffect } from 'react';
import { Container, Link } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { useMutation } from 'react-apollo';
import EmailPasswordForm from './EmailPasswordForm';
import gql from 'graphql-tag';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useAuthStyles } from './styles';

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
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);
  const classes = useAuthStyles();

  useEffect(() => {
    if (error) {
      props.enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  if (data && data.signup && data.signup.token) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

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

export default withSnackbar(Signup);

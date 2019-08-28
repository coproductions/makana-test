import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { useMutation } from 'react-apollo';
import EmailPasswordForm from './EmailPasswordForm';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

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
    <Container maxWidth="sm">
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => signup({ variables: values })}
        submitLabel="Sign up"
        includeName={true}
      />
    </Container>
  );
}

export default withSnackbar(Signup);

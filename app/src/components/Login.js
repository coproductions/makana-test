import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { useMutation } from 'react-apollo';
import EmailPasswordForm from './EmailPasswordForm';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login(props) {
  const [values, setValues] = useState({ email: '', password: '', persist: 'true' });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      props.enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  return (
    <Container maxWidth="sm">
      <EmailPasswordForm
        values={values}
        setValues={setValues}
        onSubmit={() => login({ variables: values })}
        submitLabel="Log in"
      />
    </Container>
  );
}

export default withSnackbar(Login);

import { Container, Link } from '@material-ui/core';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { withSnackbar } from 'notistack';
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
      <Link component={RouterLink} to="/login">
        login
      </Link>{' '}
    </Container>
  );
}
export default compose(
  withRouter,
  withSnackbar
)(Signup);

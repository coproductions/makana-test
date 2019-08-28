import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { useMutation } from 'react-apollo';

import gql from 'graphql-tag';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login(props) {
  const classes = useStyles();
  const [values, setValues] = useState({ email: '', password: '', persist: 'true' });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  useEffect(() => {
    if (error) {
      props.enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  return (
    <Container maxWidth="sm">
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          login({ variables: values });
        }}
      >
        <TextField
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          label="email"
          margin="normal"
          variant="outlined"
          name="email"
          type="email"
        />

        <TextField
          className={classes.textField}
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
          variant="outlined"
          label="password"
          name="password"
          type="password"
        />
        <Button type="submit">Log in</Button>
      </form>
    </Container>
  );
}

export default withSnackbar(Login);

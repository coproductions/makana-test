import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loading from './Loading';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { LOGIN_USER, SIGN_UP } from '../operations';
import { Link as RouterLink, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ isSignUp, history }) => {
  const [values, setValues] = useState({ email: '', password: '', name: 'tom' });
  const classes = useStyles();
  const mutation = isSignUp ? SIGN_UP : LOGIN_USER;
  const navigate = () => history.push('/');
  const [mutate, loading] = useAuthMutation({ mutation, navigate });
  const callToAction = isSignUp ? 'Sign up' : 'Log in';
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value.trim(),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {callToAction}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            mutate({ variables: values });
          }}
        >
          {isSignUp && (
            <TextField
              onChange={handleChange('name')}
              autoComplete="name"
              name="name"
              variant="outlined"
              required={isSignUp}
              fullWidth
              id="name"
              label="Name"
              autoFocus
              value={values.name}
            />
          )}
          <TextField
            value={values.email}
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange('email')}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            autoComplete="email"
          />
          <TextField
            value={values.password}
            onChange={handleChange('password')}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {loading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!values.email || !values.password}
              className={classes.submit}
            >
              {callToAction}
            </Button>
          )}

          <Grid container>
            <Grid item>
              <Link component={RouterLink} to={isSignUp ? '/login' : '/signup'} variant="body2">
                {!isSignUp ? `Don't have an account? Signup` : 'Already have an account? Login'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(SignIn);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const GET_NAME = gql`
  {
    me {
      name
    }
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const LOG_OUT = gql`
  mutation logout {
    logout @client
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppHeader = props => {
  const classes = useStyles();
  const loginQuery = useQuery(IS_LOGGED_IN);
  const isLoggedIn = !loginQuery.loading && !loginQuery.error && loginQuery.data.isLoggedIn;
  const nameQuery = useQuery(GET_NAME, { skip: !isLoggedIn });
  const [logout] = useMutation(LOG_OUT);

  const toLogin = () => {
    props.history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && nameQuery.data.me && (
            <Typography variant="h6" className={classes.title}>
              {nameQuery.data.me.name}
            </Typography>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
          {!isLoggedIn && (
            <Button color="inherit" onClick={toLogin}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(AppHeader);

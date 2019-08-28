import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useApolloClient } from 'react-apollo';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { withRouter } from 'react-router-dom';

const GET_ME = gql`
  {
    me {
      id
      name
    }
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
  const client = useApolloClient();
  const { loading, error, data } = useQuery(GET_ME);

  const isLoggedIn = !error && !loading && data.me && localStorage.getItem(AUTH_TOKEN);
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
  };
  const toLogin = () => {
    props.history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && (
            <Typography variant="h6" className={classes.title}>
              {data.me.name}
            </Typography>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
          {!isLoggedIn && !loading && (
            <Button color="inherit" onClick={toLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(AppHeader);

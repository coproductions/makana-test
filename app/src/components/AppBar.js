import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { AppBar, Button, Toolbar, Switch, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { useUserQuery, useErrorHandler } from '../hooks';
import { LOG_OUT } from '../operations';
import PostComment from './PostComment';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  postContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
}));

const AppHeader = props => {
  const classes = useStyles();
  const { isLoggedIn } = useUserQuery();
  const [logout, { error }] = useMutation(LOG_OUT);
  useErrorHandler(error);

  const toLogin = () => {
    props.history.push('/login');
  };

  return (
    <AppBar position="absolute">
      <Toolbar>
        {isLoggedIn && (
          <FormControlLabel
            control={
              <Switch
                checked={props.showPrivate}
                onChange={e => props.setShowPrivate(e.target.checked)}
                value="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Private mode"
          />
        )}
        <div className={classes.grow}></div>
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
      {isLoggedIn && (
        <div className={classes.postContainer}>
          <PostComment showPrivate={props.showPrivate} />
        </div>
      )}
    </AppBar>
  );
};

export default withRouter(AppHeader);

import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { AppBar, Button, Toolbar, Switch, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { IS_LOGGED_IN, LOG_OUT } from '../operations';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

const AppHeader = props => {
  const classes = useStyles();
  const loginQuery = useQuery(IS_LOGGED_IN);
  const isLoggedIn = !loginQuery.loading && !loginQuery.error && loginQuery.data.isLoggedIn;
  const [logout] = useMutation(LOG_OUT);

  const toLogin = () => {
    props.history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
              label="Private"
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
      </AppBar>
    </div>
  );
};

export default withRouter(AppHeader);

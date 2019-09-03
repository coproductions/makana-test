import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Switch,
  makeStyles,
  FormControlLabel,
} from '@material-ui/core';
import React from 'react';
import { useUserQuery } from '../hooks';
import PostComment from './PostComment';
import AppBarMenu from './AppBarMenu';

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
        {isLoggedIn && <AppBarMenu />}
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

import React, { useState } from 'react';
import { withStyles, colors, Paper, IconButton, Button, InputBase, Divider } from '@material-ui/core';
import PrivateIcon from '@material-ui/icons/VpnLock';
import PublicIcon from '@material-ui/icons/Public';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { compose } from 'recompose';

const styles = theme => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    backgroundColor: colors.grey[100],
    padding: theme.spacing(1),
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  buttonLabel: {
    marginLeft: theme.spacing(1),
  },
});

const PostComment = ({ classes }) => {
  const [isPublic, setIsPublic] = useState(true);
  return (
    <Paper className={classes.paper} elevation={3}>
      <Tooltip title={isPublic ? 'Public' : 'Private'}>
        <IconButton
          className={classes.iconButton}
          onClick={() => setIsPublic(!isPublic)}
          aria-label={isPublic ? 'Public' : 'Private'}
        >
          {isPublic ? <PublicIcon /> : <PrivateIcon />}
        </IconButton>
      </Tooltip>

      <InputBase className={classes.input} multiline={true} rowsMax={5} placeholder="Type your mind ..." />
      <Divider className={classes.divider} orientation="vertical" />
      <Button className={classes.iconButton} aria-label="search">
        Post
      </Button>
    </Paper>
  );
};

export default compose(withStyles(styles))(PostComment);

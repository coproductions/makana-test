import React, { useState } from 'react';
import { withStyles, colors, Paper, IconButton, Button, InputBase, Divider } from '@material-ui/core';
import PrivateIcon from '@material-ui/icons/VpnLock';
import PublicIcon from '@material-ui/icons/Public';
import Tooltip from '@material-ui/core/Tooltip';
import { useMutation } from 'react-apollo';
import { compose } from 'recompose';
import { CREATE_COMMENT } from '../operations';

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
  const [message, setMessage] = useState('');

  const [createComment] = useMutation(CREATE_COMMENT);

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

      <InputBase
        value={message}
        onChange={e => setMessage(e.target.value)}
        className={classes.input}
        multiline={true}
        rowsMax={5}
        placeholder="Type your mind ..."
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Button
        onClick={() => createComment({ variables: { message, isPublic } })}
        className={classes.iconButton}
        aria-label="search"
      >
        Post
      </Button>
    </Paper>
  );
};

export default compose(withStyles(styles))(PostComment);

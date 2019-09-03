import React, { useState, Fragment } from 'react';
import {
  withStyles,
  colors,
  Paper,
  Container,
  IconButton,
  Button,
  InputBase,
  Divider,
} from '@material-ui/core';
import PrivateIcon from '@material-ui/icons/VpnLock';
import PublicIcon from '@material-ui/icons/Public';
import { Tooltip } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { compose } from 'recompose';
import { CREATE_COMMENT, FEED_QUERY } from '../operations';
import { useUserQuery, useErrorHandler } from '../hooks';
import Loading from './Loading';
import { useSnackbar } from 'notistack';

const styles = theme => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRight: 0,

    // margin: theme.spacing(2),
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

const PostComment = ({ classes, showPrivate }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [message, setMessage] = useState('');
  const { me } = useUserQuery();
  const { enqueueSnackbar } = useSnackbar();
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => setMessage(''),
    update: (cache, { data }) => {
      let updatePrivate = false;
      if (!data.createComment.isPublic && !showPrivate) {
        enqueueSnackbar('You added a private comment. Switch on private mode to see it.', {
          variant: 'info',
        });
        updatePrivate = true;
      }

      try {
        const { feed } = cache.readQuery({
          query: FEED_QUERY,
          variables: { showPrivate: updatePrivate || showPrivate },
        });
        cache.writeQuery({
          query: FEED_QUERY,
          variables: { showPrivate: updatePrivate || showPrivate },

          data: {
            feed: [{ ...data.createComment, children: [], author: me }, ...feed],
          },
        });
      } catch (e) {}
    },
  });
  useErrorHandler(error);
  const addComment = () => createComment({ variables: { message, isPublic } });

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Paper square className={classes.paper} elevation={0}>
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
            rowsMax={message ? 5 : 1}
            placeholder={`Type your mind ${me.name} ...`}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <Button onClick={addComment} className={classes.iconButton} disabled={!message} aria-label="post">
            Post
          </Button>
        </Paper>
      </Container>
      {loading && <Loading centered />}
    </Fragment>
  );
};

export default compose(withStyles(styles))(PostComment);

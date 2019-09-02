import { CardContent, Collapse, colors, Typography, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { compose } from 'recompose';
import { useMutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { Fragment, useState } from 'react';
import TimeAgo from 'react-timeago';
import Replies from './Replies';
import { DELETE_COMMENT, FEED_QUERY } from '../operations';
import { useUserQuery } from '../hooks';
import Loading from './Loading';
import { useErrorHandler } from '../hooks';
import ColorAvatar from './ColorAvatar';

const styles = theme => ({
  card: {
    margin: theme.spacing(2),
  },
  avatar: {
    margin: 10,
  },
  bottomNav: {
    display: 'flex',
    justifyContent: 'center',
    height: 25,
  },
  header: {
    paddingTop: 0,
    paddingBottom: theme.spacing(0),
    borderBottom: `2px solid ${colors.grey[100]}`,
  },
  content: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  deleteButton: {
    marginTop: theme.spacing(2),
  },
});

const enhanced = compose(withStyles(styles));

export default enhanced(({ classes, message, createdAt, author, id, isPublic, showPrivate, children }) => {
  const { me } = useUserQuery();
  const [expandComments, setExpandComments] = useState(false);
  const [deleteComment, { loading, error }] = useMutation(DELETE_COMMENT, {
    update: (cache, { data }) => {
      try {
        const { feed } = cache.readQuery({
          query: FEED_QUERY,
          variables: { showPrivate },
        });
        cache.writeQuery({
          query: FEED_QUERY,
          variables: { showPrivate },
          data: {
            feed: feed.filter(comment => comment.id !== data.deleteComment.id),
          },
        });
      } catch (e) {}
    },
  });
  useErrorHandler(error);

  const isMine = me && me.id === author.id;

  return (
    <Card className={classes.card}>
      {loading ? (
        <Loading centered padding={20} />
      ) : (
        <Fragment>
          <CardHeader
            className={classes.header}
            avatar={<ColorAvatar {...author} className={classes.avatar} />}
            action={
              isMine && (
                <IconButton
                  className={classes.deleteButton}
                  aria-label="delete"
                  disabled={loading}
                  onClick={() => deleteComment({ variables: { id } })}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )
            }
            title={author.name}
            subheader={<TimeAgo date={createdAt} />}
          ></CardHeader>
          <CardContent className={classes.content}>
            <Typography variant="body1">{message}</Typography>
          </CardContent>
        </Fragment>
      )}
      {!!true && (
        <Collapse in={true} collapsedHeight="100">
          <div className={classes.bottomNav}>
            <Typography
              onClick={() => setExpandComments(!expandComments)}
              variant="caption"
            >{`${children.length} replies`}</Typography>
          </div>
          {expandComments && (
            <Replies {...{ classes, message, createdAt, author, id, isPublic, showPrivate, children }} />
          )}
        </Collapse>
      )}
    </Card>
  );
});
